import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import {Config} from "../model/config";
import {LogService} from "./log.service";

@Injectable()
export class SubmitService {

  constructor(private http: Http) { }

  /**
   * 请求提交列表
   */
  getSubmitTable(pageNum: number,pageSize: number): Promise<any> {
    let params = new URLSearchParams();
    params.set("pageSize",pageSize.toString());
    params.set("pageNum",pageNum.toString());
    return this.http.get(Config.url_judge_list,{params:params}).toPromise()
            .then(response => response.json())
            .catch(LogService.handleError)
  }
}
