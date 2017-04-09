import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import {Config} from "../model/config";
import {LogService} from "./log.service";

@Injectable()
export class ProblemService {

  constructor(private http: Http) {
  }

  /**
   * 得到表单总题目路
   * @param stage 属于的阶段
   * @param search
   * @param order
   * @param pageNum
   * @param pageSize
   */
  getProblemTable(stage: number, search: string, order: string, pageNum: number, pageSize: number) {
    let urlParams = new URLSearchParams();
    urlParams.set('search',search);
    urlParams.set('order',order);
    urlParams.set('pageNum',pageNum.toString());
    urlParams.set('pageSize',pageSize.toString());
    return this.http.get(Config.url_problem_stage + stage,{params:urlParams}).toPromise()
              .then(response => response.json())
              .catch(LogService.handleError)
  }
}
