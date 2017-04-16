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
  submits: SubmitModel[];
  total: number = 0;
  pageSize: number = 20;
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
      this.freshCount = '0';
      while(count-- > 1){
        window.setTimeout(()=>{
          this.getSubmits();
          if (count == 1){
            this.userService.freshCurrentUser(this.currentUser.id,true);
          }
        },count* 5000)
      }
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
            this.submits = x.data.contents as SubmitModel[]
          }
        })
    },500)
  }

  /**
   * 页面变化监听
   * @param $event
   */
  pageChanged($event){
    this.currentPage = $event.page;
    this.getSubmits();
  }


}
