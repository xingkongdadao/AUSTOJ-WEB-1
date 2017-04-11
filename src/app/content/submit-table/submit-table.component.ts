import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {UserInfoModel} from "../../model/user-info-model";
import {CookieService} from "../../service/cookie-service.service";
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
  submits: SubmitModel[];
  total: number = 0;
  pageSize: number = 25;
  currentPage: number = 1;

  freshCount: string;

  constructor(
    private submitService: SubmitService,
    private userService: UserService,
    private toastr: ToastsManager,
    private vr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vr);
    this.currentUser = this.userService.currentUser();
    this.freshCount = window.localStorage.getItem("freshCount");
    window.localStorage.removeItem("freshCount")
  }

  ngOnInit() {
    this.getSubmits();
    if (this.freshCount){
      let count = Number.parseInt(this.freshCount);
      while(count-- > 1){
        setTimeout(this.getSubmits(),count* 5000)
      }
    }
  }

  /**
   * 页面变化监听
   * @param $event
   */
  pageChanged($event){
    this.currentPage = $event.page;
    this.getSubmits();
  }

  /**
   * 得到提交列表
   */
  getSubmits(){
    this.submitService.getSubmitTable(this.currentPage,this.pageSize)
      .then(x => {
        if (LogService.filterJson(x,this.toastr)){
          this.total = x.total;
          this.submits = x.contents as SubmitModel[]
        }
      })
  }

}
