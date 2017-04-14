import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import {Config} from "../model/config";
import {LogService} from "./log.service";

@Injectable()
export class ContestService {

  constructor(private http: Http) { }

  /**
   * 判断指定竞赛是否可以显示
   * @param contestId 竞赛id
   */
  isCanView(contestId: number,passwd: string): Promise<any>{
    let params = new URLSearchParams();
    params.set('passwd',passwd);
    return this.http.post(Config.url_contest_show+contestId,params).toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  /**
   * 得到竞赛详情
   * @param contestId 竞赛id
   * @returns {Promise<any>}
   */
  getContest(contestId: number): Promise<any>{
    return this.http.get(Config.url_contest_show+contestId).toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  /**
   * 得到首页竞赛表
   */
  getContestTable(): Promise<any>{
    return this.http.get(Config.url_contest).toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

}
