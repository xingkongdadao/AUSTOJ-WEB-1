import { Component, OnInit } from '@angular/core';
import {ArticleModel} from "../../model/article-model";
import {ArticleService} from "../../service/article.service";
import {LogService} from "../../service/log.service";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  currentSearch: string;

  articleModels: ArticleModel[];

  totalItems: number;

  currentPage: number = 1;

  pageSize: number = 5;


  constructor(
    private articleService: ArticleService
  ) { }


  doSearch(){
    this.getArticles();
  }


  doTagSearch(tas: string){
    LogService.debug(tas)
    this.currentSearch = tas;
    this.getArticles();
    return false;
  }
  /**
   * 页面变化监控
   * @param $event
   */
  pageChanged($event){
    this.currentPage = $event.page;
    this.getArticles();
  }

  ngOnInit() {
    this.getArticles();
  }

  getArticles(){
    this.articleService.getArticles(this.currentSearch,this.currentPage,this.pageSize)
      .then(x => {
        if (x.status == 0){
          this.articleModels = x.data.contents as ArticleModel[];
          this.totalItems = x.data.total;
        }
      })
  }



}
