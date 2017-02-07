import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {URLSearchParams} from "@angular/http";
import {HttpServer} from "../servers/http.server";
@Component({
  selector: "three-link",
  templateUrl: "../templates/three-link.component.html"
})
export class ThreeLinkComponent implements OnInit {

  // 输出一下参数
  @Output() provinceOut = new EventEmitter();
  @Output() cityOut = new EventEmitter();
  @Output() countryOut = new EventEmitter();

  province:string;
  city:string;
  country:string;
  provinceData:Array<Object>;
  cityData:Array<Object>;
  countryData:Array<Object>;

  constructor(public httpServer:HttpServer) {
    // 设置省市县的默认值, 显示请选择, 要不然会有一个问题(选择省份的时候,市改变了,但是县没有变)
    this.province = "-1";
    this.city = "-1";
    this.country = "-1";
    this.provinceData = [];
    this.cityData = [];
    this.countryData = [];
  }

  // 选择省份
  ngOnInit() {
    // 初始化省市县
    var url = "http://localhost:3000/province";
    var params = new URLSearchParams();
    params.set("callback", "JSONP_CALLBACK");

    this.httpServer.jsonpGet(url, params).subscribe(res=> {
      console.log(res);
      this.provinceData = res;
    });
    this.provinceChange();
    this.cityChange();
    this.countryChange();
  }

  // 选择省份, 查询相应的市
  provinceChange() {
    // 选择省份的时候发射省份给父组件
    this.provinceOut.emit(this.province);

    var url = "http://localhost:3000/city";
    var params = new URLSearchParams();
    params.set("ProID", this.province);
    params.set("callback", "JSONP_CALLBACK");
    this.httpServer.jsonpGet(url, params).subscribe(res=> {
      console.log(res);
      this.cityData = res;
    });
    this.countryData = [];
  }

  // 选择市, 查询相应的县
  cityChange() {
    // 选择市的时候发射市给父组件
    this.cityOut.emit(this.city);

    var url = "http://localhost:3000/country";
    var params = new URLSearchParams();
    params.set("CityID", this.city);
    params.set("callback", "JSONP_CALLBACK");
    this.httpServer.jsonpGet(url, params).subscribe(res=> {
      console.log(res);
      this.countryData = res;
    });
  }

  // 选择市的时候发射县给父组件
  countryChange() {
    this.countryOut.emit(this.country);
  }
}
