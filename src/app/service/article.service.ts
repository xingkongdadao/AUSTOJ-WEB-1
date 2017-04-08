import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Config} from "../model/config";
import {LogService} from "./log.service";

@Injectable()
export class ArticleService {

  constructor(private http: Http) { }

  /**
   * 获取侧边栏文章
   */
  getArticleAside(): Promise<any>{
    return this.http.get(Config.url_article_aside).toPromise()
      .then(response => response.json())
      .catch(LogService.handleError)
  }

}
