import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {ContestModel} from "../../model/contest-model";
import {ContestService} from "../../service/contest.service";
import {Logs} from "selenium-webdriver";
import {LogService} from "../../service/log.service";
import {ToastsManager} from "ng2-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss']
})
export class ContestComponent implements OnInit {

  @ViewChild('passwdModal') public passwdModal:ModalDirective;

  currentContestId: number = 0;

  passwd: string;

  exprieContest: ContestModel[];

  noExprieContest: ContestModel[];

  constructor(
    private contestService: ContestService,
    private toastr: ToastsManager,
    private vr: ViewContainerRef,
    private router: Router
  ) {
    this.toastr.setRootViewContainerRef(vr)
  }

  ngOnInit() {
    this.getContest();
  }

  /**
   * 显示modal,显示时拿到用户点击的竞赛id
   * @param contestId 竞赛id
   */
  showModal(contestId: number,contestType: string){
    if (!this.passwdModal.isShown && contestId){
      this.currentContestId = contestId;
      if (contestType == '公开赛'){
        this.doPasswdSubmit();
      }else {
        this.passwdModal.show();
      }
    }
  }

  /**
   * 提交判断是否可以查看该竞赛
   */
  doPasswdSubmit(){
    this.contestService.isCanView(this.currentContestId,this.passwd)
      .then(x => {
        if (LogService.filterJson(x,this.toastr)){
          this.contestService.getContest(this.currentContestId)
            .then(x => {
              if (LogService.filterJson(x,this.toastr)){
                this.router.navigateByUrl('/aust/contest/'+this.currentContestId);
              }
            })
        }
      })
  }

  /**
   * 获取首页竞赛数据
   */
  getContest(){
    this.contestService.getContestTable()
      .then(x => {
        LogService.debug(x);
        if (x.status == 0) {
          this.exprieContest = x.data.exprieContest as ContestModel[];
          this.noExprieContest = x.data.noExprieContest as ContestModel[];
        }
      })
  }

}
