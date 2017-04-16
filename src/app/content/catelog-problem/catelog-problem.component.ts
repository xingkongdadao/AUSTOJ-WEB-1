import { Component, OnInit } from '@angular/core';
import {LogService} from "../../service/log.service";
import {ProblemTableModel} from "../../model/problem-table-model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProblemService} from "../../service/problem.service";

@Component({
  selector: 'app-catelog-problem',
  templateUrl: './catelog-problem.component.html',
  styleUrls: ['./catelog-problem.component.scss']
})
export class CatelogProblemComponent implements OnInit {

  problems: ProblemTableModel[];
  public search: string;
  public order: string = 'asc';
  public totalItems: number = 0;
  public currentPage: number = 1;
  //表示当前所处路由下
  public currentCateLog: string;
  public catelogName: string;

  constructor(private problemService: ProblemService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .switchMap((params,Params) => {
        this.currentCateLog = params['id'];
        return this.currentCateLog;
      })
      .subscribe(x => {
        this.getProblemTable();
      });
  }

  /**
   * 当前页监听
   * @param event
   */
  public pageChanged(event:any):void {
    this.currentPage = event.page;
    this.getProblemTable();
  }

  /**
   * 搜索
   */
  doSearch(){
    this.getProblemTable();
  }

  /**
   * 刷新
   */
  doRefresh(){
    this.problems = null;
    this.getProblemTable();
  }

  /**
   * 得到题目表单
   */
  getProblemTable(){
    LogService.debug("current page "+this.currentPage);
    this.problems = null;
    window.setTimeout(() =>{
      let catelog = Number.parseInt(this.currentCateLog);
      this.problemService.getCatelogProblemTable(catelog,this.search,this.order,this.currentPage,20)
        .then(x => {
          if (x.status == 0){
            this.problems = x.data.contents as ProblemTableModel[];
            this.totalItems = x.data.total;
            this.catelogName = x.data.catelogName;
            LogService.debug("getProblemTable:");
            LogService.debug(x);
          }
        })
    },500)
  }

}
