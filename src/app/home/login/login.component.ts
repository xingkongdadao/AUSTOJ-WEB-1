import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {UserService} from "../../service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../model/user-model";
import {Config} from "../../model/config";
import {Toast, ToastsManager} from "ng2-toastr";
import {Router} from "@angular/router";
import {LogService} from "../../service/log.service";
import {CookieService} from "../../service/cookie-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  userInfo: UserModel = new UserModel();
  codeImgUrl: string = Config.url_codeImage;
  postError: string;

  refer: string = '';

  constructor(private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private toastr: ToastsManager,
              private vr: ViewContainerRef) {
    toastr.setRootViewContainerRef(vr);
    this.userInfo.email = CookieService.getCookie('loginEmail');
  }

  ngOnInit() {
    this.buildForm();
    this.changeCode();
    this.refer = window.document.referrer;
    LogService.debug("refer: "+ this.refer);
  }

  doLogin(){
    if (this.userForm.valid){
      this.userInfo = this.userForm.value;
      //记住用户名
      if (this.userInfo.remberMe) {
        CookieService.addCookie("loginEmail",this.userInfo.email,168);
      }
      this.userService.login(this.userInfo,this.refer)
        .then(x => {
          if (x.status == 0){
            this.postError = '';
            this.toastr.success("登录成功,即将后跳转到登录页",'SUCCESS',{positionClass:'toast-top-center',dismiss: 'controlled'})
              .then((toast: Toast) => {
                setTimeout(() => {
                  this.toastr.dismissToast(toast);
                  this.router.navigateByUrl(x.data.refer);
                }, 3000)
              });
            //刷新当前用户信息
            this.userService.freshCurrentUser(x.data.id,true);
          }else {
            this.postError = x.msg;
            this.toastr.error(this.postError);
            this.changeCode();
          }
        })
    } else {
      this.toastr.warning("信息有误,请纠正后再登录")
    }
  }

  /**
   * 更改验证码
   */
  changeCode(){
    this.codeImgUrl = Config.url_codeImage + '?date=' + new Date().getTime();
  }

  public formErrors = {
    'email': '',
    'Password': '',
    'vcode':''
  };

  validationMessages = {
    'email': {
      'required': '邮箱必须输入。',
      'pattern': '请输入正确的邮箱地址。'
    },
    'Password': {
      'required': '密码必须输入。',
      'minlength': '密码至少要8位。'
    },
    'vcode': {
      'required': '验证码必须输入。',
      'minlength': '4位验证码',
      'maxlength': '4位验证码'
    },
  };

  buildForm(): void {
    this.userForm = this.fb.group({
      "email": [
        this.userInfo.email,
        [
          Validators.required,
          Validators.pattern("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$")
        ]
      ],
      "Password": [
        this.userInfo.Password,
        [
          Validators.required,
          Validators.minLength(6),
        ]
      ],
      "vcode": [
        this.userInfo.vcode,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4)
        ]
      ],
      "remberMe": [
        this.userInfo.remberMe
      ]
    });
    this.userForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
}
