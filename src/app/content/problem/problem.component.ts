import { Component, OnInit } from '@angular/core';
import {ProblemModel} from "../../model/problem-model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProblemService} from "../../service/problem.service";
import {UserInfoModel} from "../../model/user-info-model";
import {CookieService} from "../../service/cookie-service.service";
import {JudgeModel} from "../../model/judge-model";
import {LogService} from "../../service/log.service";
import {UserService} from "../../service/user.service";

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
    private userService: UserService
  ) {
    this.currentUser = this.userService.currentUser();
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        return this.problemService.getProblem(params['id'])
      })
      .subscribe(x => {
        if (x.status == 0){
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
    LogService.debug(this.judgeModel)
    window.localStorage.setItem("freshCount","5");
    this.router.navigateByUrl("/aust/submit");
  }



}
