import {Injectable, OnInit} from '@angular/core';
import {UserModel} from "../model/user-model";
import {Headers, Http, URLSearchParams} from "@angular/http";
import {LogService} from "./log.service";
import {Config} from "../model/config";

@Injectable()
export class UserService implements OnInit{

  constructor(private http: Http) { }

  ngOnInit(): void {

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
      .catch(this.handleError);
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
      .catch(this.handleError);
  }

  /**
   * 获取主页显示用户
   * @returns {Promise<any>}
   */
  fetchIndexUsers(): Promise<any>{
    return this.http.get(Config.url_indexUsers).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
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
      .catch(this.handleError);
  }

  /**
   * 处理请求中的错误
   * @param error 错误
   * @returns {Promise<never>}
   */
  private handleError(error: any): Promise<any> {
    LogService.error('fetch user error',error);
    return Promise.reject(error.message || error);
  }

}
