import { Component, OnInit } from '@angular/core';
import {ProblemTableModel} from "../../model/problem-table-model";
import {ProblemService} from "../../service/problem.service";
import {LogService} from "../../service/log.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-start',
  templateUrl: './problem.table.component.html',
  styleUrls: ['./problem.table.component.scss']
})
export class ProblemTableComponent implements OnInit {


  problems: ProblemTableModel[];
  public search: string;
  public order: string = 'asc';
  public totalItems: number = 0;
  public currentPage: number = 1;
  //表示当前所处路由下
  private currentStage: number = 1;
  public currentMsg: string;

  constructor(private problemService: ProblemService,
              private router: Router) {
    switch (router.url){
      case "/aust/practice":
        this.currentStage = 2;
        this.currentMsg = 'practice';
        break;
      case "/aust/master":
        this.currentStage = 3;
        this.currentMsg = 'master';
        break;
      default:
        this.currentStage = 1;
        this.currentMsg = 'start';
    }
  }

  ngOnInit() {
    this.getProblemTable();
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
    LogService.debug("current stage "+this.currentStage);
    this.problems = null;
    window.setTimeout(()=>{
      this.problemService.getProblemTable(1,this.search,this.order,this.currentPage,20)
        .then(x => {
          if (x.status == 0){
            this.problems = x.data.contents as ProblemTableModel[];
            this.totalItems = x.data.total;
            LogService.debug("getProblemTable:");
            LogService.debug(x);
          }
        })
    },500)
  }
}
