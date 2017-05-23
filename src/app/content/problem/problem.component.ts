import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ProblemModel} from "../../model/problem-model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProblemService} from "../../service/problem.service";
import {UserInfoModel} from "../../model/user-info-model";
import {JudgeModel} from "../../model/judge-model";
import {LogService} from "../../service/log.service";
import {UserService} from "../../service/user.service";
import {SubmitService} from "../../service/submit.service";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {

  problem: ProblemModel;
  judgeModel: JudgeModel = new JudgeModel();
  //当前用户
  currentUser: UserInfoModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private problemService: ProblemService,
    private userService: UserService,
    private submitService: SubmitService,
    private toastr: ToastsManager,
    private vr : ViewContainerRef
  ) {
    this.currentUser = this.userService.currentUser();
    this.toastr.setRootViewContainerRef(vr);
    this.judgeModel.lang = this.currentUser.language;
  }

  ngOnInit() {
    //获取竞赛id
    this.route.queryParamMap
      .subscribe(x => {
        this.judgeModel.contestid = Number.parseInt(x.get('contest_id'));
      });

    this.route.params
      .switchMap((params: Params) => {
        return this.problemService.getProblem(params['id'],this.judgeModel.contestid)
      })
      .subscribe(x => {
        LogService.debug('ProblemComponent'+x);
        this.problem = null;
        if (LogService.filterJson(x,this.toastr)){
          this.problem = x.data as ProblemModel;
          this.judgeModel.problemId = this.problem.id;
        }
      });
  }

  /**
   * 提交判题表单
   * 提交成功后跳转到个人提交页面
   */
  doSubmit(){
    LogService.debug(this.judgeModel);
    if (!this.judgeModel && !this.judgeModel.source && this.judgeModel.lang){
      this.toastr.warning("请认真提交!!!");
      return;
    }
    this.submitService.judgeSubmit(this.judgeModel)
      .then(x => {
        if (LogService.filterJson(x,this.toastr)){
          window.localStorage.setItem("solutionId",x.data);
          this.router.navigateByUrl("/aust/submit");
        }
      });
  }



}
