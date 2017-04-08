import { Component, OnInit } from '@angular/core';
import {ArticleModel} from "../../model/article-model";
import {ArticleService} from "../../service/article.service";

@Component({
  selector: 'app-article-aside',
  templateUrl: './article-aside.component.html',
  styleUrls: ['./article-aside.component.scss']
})
export class ArticleAsideComponent implements OnInit {

  articlesAside: ArticleModel[];

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getArticleAside()
      .then(x => {
        if (x.status == 0){
          this.articlesAside = x.data as ArticleModel[]
        }
      })
  }



}
