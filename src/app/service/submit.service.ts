import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import {Config} from "../model/config";
import {LogService} from "./log.service";
import {JudgeModel} from "../model/judge-model";

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

  /**
   * 提交判题
   * @param judgeModel 判题实体
   */
  judgeSubmit(judgeModel: JudgeModel){
    let params = new URLSearchParams();
    params.set('code',judgeModel.source);
    params.set('lang',judgeModel.lang);
    return this.http.post(Config.url_judge_submit+judgeModel.problemId,params).toPromise()
            .then(response => response.json())
            .catch(LogService.handleError);
  }
}
