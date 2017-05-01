import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Config} from "../../model/config";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../model/user-model";
import {Toast, ToastsManager} from "ng2-toastr";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {LogService} from "../../service/log.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public userForm: FormGroup;
  public userInfo: UserModel = new UserModel();
  codeImgUrl: string = Config.url_codeImage;
  postError: string;//请求反馈的错误

  constructor(public fb: FormBuilder,
              private toastr: ToastsManager,vr: ViewContainerRef,
              private userService: UserService,
              private router: Router) {
    toastr.setRootViewContainerRef(vr);
  }

  ngOnInit() {
    this.buildForm();
    this.userInfo.email = window.localStorage.getItem('registerEmail');
    window.localStorage.removeItem('registerEmail');
    this.changeCode();
  }

  /**
   * 键盘事件
   */
  onEnter(){
    LogService.debug("键盘事件");
    if (this.userForm.invalid){
      this.doRegister();
    }
  }

  /**
   * 注册方法
   */
  doRegister(){
    if (this.userForm.valid){
      this.userInfo = this.userForm.value;
      this.userService.register(this.userInfo)
        .then(x => {
          if (x.status == 0){
            this.toastr.success("注册成功,即将后跳转到登录页",'SUCCESS',{positionClass:'toast-top-center',dismiss: 'controlled'})
              .then((toast: Toast) => {
                setTimeout(() => {
                  this.toastr.dismissToast(toast);
                  this.router.navigateByUrl('login')
                }, 3000)
            })
          } else {
            this.postError = x.msg;
            this.toastr.error(x.msg);
            this.changeCode();
          }
        })
    }else {
      this.toastr.error("存在不合法的选项,请修正后再提交");
    }
  }

  /**
   * 更改验证码
   */
  changeCode(){
    this.codeImgUrl = Config.url_codeImage + '?date=' + new Date().getTime();
  }

  /**
   * 检查邮箱是否已注册
   */
  checkRepeatEmail(){
    let email = this.userForm.get("email").value;
    if (email){
      this.userService.checkRepeatEmail(email)
        .then(x => {
          if (x.status != 0){
            this.postError = x.msg;
            this.toastr.warning(this.postError);
            this.formErrors['email'] = this.postError;
          }else{
            this.postError = '';
            this.formErrors['email'] = '';
          }
        })
    }
  }

  public formErrors = {
    'nickName': '',
    'email': '',
    'Password': '',
    'confirmPassword': '',
    'vcode':''
  };
  validationMessages = {
    'nickName': {
      'required': '昵称必须输入。',
      'minlength': '昵称2到32个字符。'
    },
    'email': {
      'required': '邮箱必须输入。',
      'pattern': '请输入正确的邮箱地址。'
    },
    'Password': {
      'required': '密码必须输入。',
      'minlength': '密码至少要8位。'
    },
    'confirmPassword': {
      'required': '重复密码必须输入。',
      'minlength': '密码至少要8位。',
      'validateEqual': "两次输入的密码不一致。"
    },
    'vcode': {
      'required': '验证码必须输入。',
      'minlength': '4位验证码',
      'maxlength': '4位验证码'
    },
  };


  buildForm(): void {
    this.userForm = this.fb.group({
      "nickName": [
        this.userInfo.nickName,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32)
        ]
      ],
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
      "confirmPassword": [
        this.userInfo.confirmPassword,
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],
      "vcode": [
        this.userInfo.vcode,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4)
        ]
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
