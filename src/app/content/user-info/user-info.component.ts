import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {UserInfoModel} from "../../model/user-info-model";
import {UserService} from "../../service/user.service";
import {LogService} from "../../service/log.service";
import {ToastsManager} from "ng2-toastr";
import {Router} from "@angular/router";
import {CookieService} from "../../service/cookie-service.service";
import {Config} from "../../model/config";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  currentUser: UserInfoModel;

  isSend:boolean = false;//是否已经发送邮件

  countDownTime: number = 60;

  //用户更新实体
  vcode: string;
  password: string;
  confirmPassword: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastsManager,
    vr: ViewContainerRef
  ) {
    this.currentUser = userService.currentUser();
    toastr.setRootViewContainerRef(vr)
  }

  ngOnInit() {
    if (!this.currentUser){
      this.router.navigateByUrl('/');
    }
  }

  /**
   * 发送邮件
   * @param codeType
   */
  sendEmail(codeType: number){
    this.isSend = true;
    this.userService.sendEmailCode(codeType,this.currentUser.email)
      .then(x => {
        if (LogService.filterJson(x,this.toastr)){
          this.toastr.success("邮件发送成功","success");
          window.setTimeout(() => this.setEmailCountdown(),1000);
        }
      })
  }

  /**
   * 发送验证码倒计时
   */
  setEmailCountdown(){
    if (this.countDownTime <= 0) {
      this.isSend = false;
      this.countDownTime = 60;
    }else {
      this.countDownTime--;
      window.setTimeout(() => this.setEmailCountdown(),1000);
    }
  }

  /**
   * 更新用户
   */
  updateUser(){
    this.userService.updateUser(this.currentUser)
      .then(x => {
        if (LogService.filterJson(x,this.toastr)){
          this.toastr.success("保存成功","success");
          this.userService.freshCurrentUser(this.currentUser.id,true);
        }
      })
  }

  /**
   * 触发元素点击
   * @returns {boolean}
   */
  showUploadFile(){
    let elementById = window.document.getElementById('uploadAvatar');
    elementById.click();
  }

  /**
   * 文件自动上传
   */
  uploadAuto(event){
    this.userService.uploadAvatar(event.srcElement.files[0])
      .then(x => {
        if (LogService.filterJson(x,this.toastr)){
          this.currentUser.avatar = Config.baseImageUrl+x.data.url;
        }
      })
  }

  /**
   * 修改密码
   */
  modifyPWD(){
    if (!(this.vcode && this.vcode.length == 5)) {
      this.toastr.warning("验证码错误", 'error');
      return;
    }
    if (!(this.password && this.confirmPassword && this.password == this.confirmPassword)) {
      this.toastr.warning("两次密码不一致", 'error');
      return;
    }
    this.userService.changePasswd(this.vcode,this.password)
      .then(x => {
        if(LogService.filterJson(x,this.toastr)){
          this.toastr.success("更新成功,请重新登录",'success')
            .then(() => {
              this.currentUser = null;
              CookieService.addCookie("currentUser",'',-100);
              window.setTimeout(() => {
                this.router.navigateByUrl("/login");
              },2000)
            })
        }
      })
  }

}
