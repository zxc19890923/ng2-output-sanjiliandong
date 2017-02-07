import {Injectable} from "@angular/core";
import {Http, Jsonp} from "@angular/http";
import "rxjs/add/operator/map";
@Injectable()
export class HttpServer {
  constructor(public http:Http, public jsonp:Jsonp) {

  }

  httpGet(url, params) {
    return this.http.get(url, {search: params}).map(result=>result.json());
  }

  httpPost(url, params) {
    return this.http.post(url, {search: params}).map(result=>result.json());
  }

  jsonpGet(url, params) {
    return this.jsonp.get(url, {search: params}).map(result=>result.json());
  }
}
