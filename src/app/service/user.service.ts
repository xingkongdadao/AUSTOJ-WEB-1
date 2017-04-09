import {Injectable, OnInit} from '@angular/core';
import {UserModel} from "../model/user-model";
import {Http, URLSearchParams} from "@angular/http";
import {LogService} from "./log.service";
import {Config} from "../model/config";
import {UserInfoModel} from "../model/user-info-model";

@Injectable()
export class UserService implements OnInit{

  currentUser: UserInfoModel;

  constructor(private http: Http) { }

  ngOnInit(): void {

  }

  /**
   * 得到当前用户
   * @returns {UserInfoModel}
   */
  getCurrentUser(){
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return this.currentUser;
  }

  /**
   * 刷新当前用户的基本信息
   * @param userId 用户id
   */
  freshCurrentUser(userId: number, isNew: boolean): UserInfoModel{
    LogService.debug("freshCurrentUser id"+userId);
    if (isNew || this.currentUser == null){
      this.fetchUserInfo(userId)
        .then(x => {
          if (x.status == 0){
            this.currentUser = x.data as UserInfoModel;
            window.localStorage.setItem("currentUser",JSON.stringify(this.currentUser));
            return this.currentUser;
          }
        });
    }
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return this.currentUser;
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
  login(userinfo: UserModel): Promise<any>{
    LogService.debug("user Login"+userinfo);
    let urlParams = new URLSearchParams();
    urlParams.set('email',userinfo.email);
    urlParams.set('password',userinfo.Password);
    urlParams.set('codevalidate',userinfo.vcode);
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
    urlParams.set('nickname',userinfo.nickName);
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
   * 获取邮箱是否重复
   * @param email 邮箱
   * @returns {Promise<any>}
   */
  checkRepeatEmail(email: string): Promise<any>{
    //浏览器兼容问题,需要tostring转换下
    let params = {'email':email};
    LogService.debug('checkRepeatEmail params:'+params);
    return this.http.get(Config.url_checkEmail,{params:params}).toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

}
