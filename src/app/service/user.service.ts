import {Injectable, OnInit} from '@angular/core';
import {UserModel} from "../model/user-model";
import {Http,URLSearchParams} from "@angular/http";
import {LogService} from "./log.service";
import {Config} from "../model/config";
import {UserInfoModel} from "../model/user-info-model";
import {Observable, Subject} from "rxjs";
import {CookieService} from "./cookie-service.service";

@Injectable()
export class UserService implements OnInit{
  /**
   * todo 订阅赋值无效
   * @type {Subject<UserInfoModel>}
   */
  subject: Subject<UserInfoModel> = new Subject<UserInfoModel> ();

  constructor(private http: Http) { }

  ngOnInit(): void {

  }

  /**
   * 得到当前用户
   * @returns {UserInfoModel}
   */
  getCurrentUser(): Observable<UserInfoModel>{
    return this.subject.asObservable();
  }

  currentUser(): UserInfoModel{
    let user = CookieService.getCookie("currentUser");
    LogService.debug(user);
    if (user){
      return JSON.parse(user)
    }
    return null;
  }

  /**
   * 判断是否登录
   * @returns {string|boolean}
   */
  isLogin():boolean{
    let user = CookieService.getCookie("currentUser");
    return user && user.length > 0;
  }

  /**
   * 刷新当前用户的基本信息
   * @param userId 用户id
   */
  freshCurrentUser(userId: number, isNew: boolean){
    LogService.debug("freshCurrentUser id"+userId);
    if (isNew){
      this.fetchUserInfo(userId)
        .then(x => {
          if (x.status == 0){
            let tempUser = x.data as UserInfoModel;
            CookieService.addCookie("currentUser",JSON.stringify(tempUser));
            this.subject.next(tempUser);
          }else {
            CookieService.addCookie("currentUser",'',-100);
          }
        }).catch(()=>{
        CookieService.addCookie("currentUser",'',-100);
      });
    }
  }

  /**
   * 获取用户的基本信息
   * @param userId 用户id
   * @returns {Promise<any>}
   */
  fetchUserInfo(userId: number): Promise<any>{
    LogService.debug("fetchUserInfo id"+userId);
    return this.http.get(Config.url_userInfo+userId).toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  /**
   * 用户登录
   * @param userinfo 用户模型
   * @returns {Promise<any>}
   */
  login(userinfo: UserModel,refer: string): Promise<any>{
    LogService.debug("user Login"+userinfo);
    let urlParams = new URLSearchParams();
    urlParams.set('email',userinfo.email);
    urlParams.set('password',userinfo.Password);
    urlParams.set('codevalidate',userinfo.vcode);
    urlParams.set('refer',refer);
    return this.http.post(Config.url_login,urlParams).toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  /**
   * 注册用户
   * @param userinfo 注册用户信息
   */
  register(userinfo: UserModel): Promise<any>{
    LogService.debug("user register: "+userinfo);
    let urlParams = new URLSearchParams();
    urlParams.set('email',userinfo.email);
    urlParams.set('password',userinfo.Password);
    urlParams.set('authorName',userinfo.nickName);
    urlParams.set('codevalidate',userinfo.vcode);
    return this.http.post(Config.url_register,urlParams).toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  /**
   * 获取主页显示用户
   * @returns {Promise<any>}
   */
  fetchIndexUsers(): Promise<any>{
    return this.http.get(Config.url_indexUsers).toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  /**
   * 获取排名用户
   */
  fetchRankUsers(): Promise<any>{
    return this.http.get(Config.url_rankUsers).toPromise()
      .then(response => response.json())
      .catch(LogService.handleError)
  }

  /**
   * 获取邮箱是否重复
   * @param email 邮箱
   * @returns {Promise<any>}
   */
  checkRepeatEmail(email: string): Promise<any>{
    //浏览器兼容问题,需要tostring转换下
    let params = new URLSearchParams();
    params.set('email',email);
    LogService.debug('checkRepeatEmail params:'+params);
    return this.http.get(Config.url_checkEmail,{params:params}).toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  /**
   * 发送短信验证码
   */
  sendEmailCode(type: number, email: string): Promise<any>{
    let params = new URLSearchParams();
    params.set('type',type.toString());
    params.set('email',email);
    return this.http.get(Config.url_email_code,{params:params}).toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  /**
   * 更改密码
   */
  changePasswd(code: string, passwd: string): Promise<any>{
    let params = new URLSearchParams();
    params.set('code',code);
    params.set('passwd',passwd);
    return this.http.post(Config.url_user_changepwd,params).toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }
  /**
   * 更新用户
   */
  updateUser(userInfo: UserInfoModel): Promise<any>{
    let params = new URLSearchParams();
    params.set('id',userInfo.id.toString());
    params.set('nickname',userInfo.nickname);
    params.set('avatar',userInfo.avatar);
    params.set('lang',userInfo.language);
    params.set('intro',userInfo.intro);
    params.set('blog',userInfo.blog);
    return this.http.post(Config.url_user_update,params).toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  uploadAvatar(file: any): Promise<any>{
    let formData:FormData = new FormData();
    formData.append('avatar',file);
    return this.http.post(Config.url_upload_img,formData).toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

}
