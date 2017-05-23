import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {UserInfoModel} from "../../model/user-info-model";
import {SubmitModel} from "../../model/submit-model";
import {SubmitService} from "../../service/submit.service";
import {LogService} from "../../service/log.service";
import {ToastsManager} from "ng2-toastr";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-submit-table',
  templateUrl: './submit-table.component.html',
  styleUrls: ['./submit-table.component.scss']
})
export class SubmitTableComponent implements OnInit {

  //当前用户
  currentUser: UserInfoModel;
  submits: Array<SubmitModel>;
  total: number = 0;
  pageSize: number = 20;
  currentPage: number = 1;

  solutionId: string;

  constructor(
    private submitService: SubmitService,
    private userService: UserService,
    private toastr: ToastsManager,
    private vr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vr);
    this.currentUser = this.userService.currentUser();
    this.solutionId = window.localStorage.getItem("solutionId");
    window.localStorage.removeItem("solutionId")
  }

  ngOnInit() {
    this.getSubmits();
    if (this.solutionId){
      let count = Number.parseInt(this.solutionId);
      this.solutionId = '0';
      this.getSubmitOne(count,1000);
    }
  }

  /**
   * 得到提交列表
   */
  getSubmits(){
    this.submits = null;
    window.setTimeout(() => {
      this.submitService.getSubmitTable(this.currentPage,this.pageSize)
        .then(x => {
          if (LogService.filterJson(x,this.toastr)){
            this.submits = null;
            this.total = x.data.total;
            this.submits = x.data.contents as Array<SubmitModel>
          }
        })
    },500)
  }

  /**
   * 得到单个提交
   */
  getSubmitOne(solutionId: number,timeout: number){
    window.setTimeout(() => {
      this.submitService.getSubmitOne(solutionId)
        .then(x => {
          if (LogService.filterJson(x,this.toastr)){
            let topSubmit:SubmitModel = x.data as SubmitModel;
            //如果正在编译则3秒后再次请求
            if (topSubmit.verdictCode === 1){
              window.setTimeout(() => this.getSubmitOne(solutionId,3000),1);
            }
            this.submits[0].verdictCode = topSubmit.verdictCode;
            this.submits[0].verdict = topSubmit.verdict;
            this.submits[0].memory = topSubmit.memory;
            this.submits[0].time = topSubmit.time;
          }
        })
    },timeout)
  }

  /**
   * 页面变化监听
   * @param $event
   */
  pageChanged($event){
    if (this.currentPage != $event.page){
      this.currentPage = $event.page;
      this.getSubmits();
    }
  }


}
