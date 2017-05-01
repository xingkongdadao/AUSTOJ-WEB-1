import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ArticleModel} from "../../model/article-model";
import {ArticleService} from "../../service/article.service";
import {LogService} from "../../service/log.service";
import {ActivatedRoute, Params} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

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
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private toastr: ToastsManager,
    vr: ViewContainerRef
  ) {
    toastr.setRootViewContainerRef(vr)
  }


  ngOnInit() {
    this.route.queryParamMap.subscribe(x => {
      LogService.debug("x:" + x.get('search'));
      this.currentSearch = x.get('search');
      this.getArticles();
    });
  }

  doSearch() {
    this.getArticles();
  }


  doTagSearch(tas: string) {
    LogService.debug(tas);
    this.currentSearch = tas;
    this.getArticles();
    return false;
  }

  /**
   * 页面变化监控
   * @param $event
   */
  pageChanged($event) {
    this.currentPage = $event.page;
    this.getArticles();
  }


  getArticles() {
    this.articleService.getArticles(this.currentSearch, this.currentPage, this.pageSize)
      .then(x => {
        if (x.status == 0) {
          this.articleModels = x.data.contents as ArticleModel[];
          this.totalItems = x.data.total;
        }
      })
  }

  /**
   * 文章点赞
   */
  doLike(article: ArticleModel){
    this.articleService.likeArtile(article.id)
      .then(x => {
        if (LogService.filterJson(x,this.toastr)){
          article.isVote = x.data.status;
          article.likecount = x.data.count;
        }
      })
  }


}
