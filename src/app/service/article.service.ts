import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
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

  /**
   * 获取文章列表
   */
  getArticles(search: string,pageNum: number, pageSize: number): Promise<any>{
    let params = new URLSearchParams();
    params.set('search',search);
    params.set('pageNum',pageNum.toString());
    params.set('pageSize',pageSize.toString());
    return this.http.get(Config.url_articles,{params: params}).toPromise()
      .then(response => response.json())
      .catch(LogService.handleError)
  }

  /**
   * 得到文章详情
   * @param id
   * @returns {Promise<any>}
   */
  getArticleDetail(id: number): Promise<any>{
    return this.http.get(Config.url_articles_detail+id).toPromise()
      .then(response => response.json())
      .catch(LogService.handleError)
  }

  /**
   * 点赞文章
   * @param articleId 文章id
   */
  likeArtile(articleId: number){
    return this.http.post(Config.url_articles_vote+articleId,null).toPromise()
      .then(response => response.json())
      .catch(LogService.handleError)
  }


}
