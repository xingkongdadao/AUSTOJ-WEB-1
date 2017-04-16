import { Component, OnInit } from '@angular/core';
import {ArticleModel} from "../../model/article-model";
import {ActivatedRoute, Params} from "@angular/router";
import {ArticleService} from "../../service/article.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  articleModel: ArticleModel;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {
    this.route.params.switchMap((params : Params) => {
      return this.articleService.getArticleDetail(params['id'])
    })
      .subscribe(x => {
        if (x.status == 0){
          this.articleModel = x.data as ArticleModel;
        }
      });
  }

  ngOnInit() {
  }



}
