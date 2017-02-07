import {Component, OnInit} from "@angular/core";
import {HttpServer} from "../servers/http.server";
import {URLSearchParams} from "@angular/http";
import {Router} from "@angular/router";

@Component({
  selector: "sport-username",
  templateUrl: "../templates/username.component.html"
})
export class UsernameComponent {
  data:Array<Object>;
  // 编辑器内容
  editorContent:string;
  ckeditorContent:string;

  sex:string;
  age:string;
  address:string;
  position:string;
  hobby:string;
  message:string;
  // 配置编辑器
  editorConfig:Object;

  // 这几个变量是从子组件,专门定义了三级联动的子组件总获取的 @Output()
  province: string;
  city: string;
  country: string;

  constructor(public httpServer:HttpServer, public router:Router) {
    this.message = "";
    this.editorContent = "";
    this.ckeditorContent = "";
    this.sex = "男";
    this.age = "";
    this.address = "";
    this.position = "";
    this.hobby = "";

    this.province = "1";
    this.city = "1";
    this.country = "1";

    this.editorConfig = {
      placeholder: "备注"
    }
  }

  ngOnInit() {
    var url = "http://localhost:3000/select_user_info";
    var params = new URLSearchParams();
    params.set("username", sessionStorage.getItem("username"));
    params.set("callback", "JSONP_CALLBACK");
    this.httpServer.jsonpGet(url, params).subscribe(res=> {
      console.log(res);
      this.data = res;
      // 修改的时候的初始值
      this.editorContent = res[0].remark;
      // 其实都要验证, 不为null的时候才给赋值,就是单机编辑资料的时候,给输入框赋填写的值
      if (res[0].sex != null) {
        this.sex = res[0].sex;
      }
      this.age = res[0].age;
      this.address = res[0].address;
      this.position = res[0].position;
      this.hobby = res[0].hobby;
      this.province = res[0].province;
      this.city = res[0].city;
      this.country = res[0].country;
    });
  }

  // 当改变输入框内容的时候触发
  onContentChanged({html, text}) {
    console.log(html, text);
    this.editorContent = html;
  }

  // 函数接受子函数传递过来的变量
  recPro(event) {
    this.province = event;
  }
  recCity(event) {
    this.city = event;
  }
  recCou(event) {
    this.country = event;
  }

  editorHandel() {
    var url = "http://localhost:3000/add_user_info";
    var params = new URLSearchParams();
    params.set("sex", this.sex);
    params.set("age", this.age);
    params.set("address", this.address);
    params.set("position", this.position);
    params.set("hobby", this.hobby);
    params.set("remark", this.editorContent);
    params.set("callback", "JSONP_CALLBACK");
    params.set("username", sessionStorage.getItem("username"));

    params.set("province", this.province);
    params.set("city", this.city);
    params.set("country", this.country);

    this.httpServer.jsonpGet(url, params).subscribe(res=> {
      console.log(res);
      if (res.affectedRows > 0) {
        // this.router.navigateByUrl("user");
        this.message = "";
        window.location.reload();
      }
      else {
        this.message = "修改信息失败";
      }
    });
  }
}
