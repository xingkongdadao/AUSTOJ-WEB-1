import {Injectable} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {Router} from "@angular/router";

@Injectable()
export class LogService {

  static isDebug: boolean = true;

  constructor(private router: Router) {
  }

  static debug(msg: any) {
    if (this.isDebug) {
      console.log(msg)
    }
  }

  static errorMsg(msg: any) {
    console.error(msg)
  }

  static error(msg: any, error: any) {
    console.error(msg, error)
  }

  /**
   * 处理请求中的错误
   * @param error 错误
   * @returns {Promise<never>}
   */
  static handleError(error: any): Promise<any> {
    LogService.error('fetch user error', error);
    return Promise.reject(error.message || error);
  }

  /**
   * 过滤返回信息
   * @param json json串
   * @param toastr 弹窗组件
   * @returns {boolean}
   */
  static filterJson(json: any, toastr: ToastsManager): boolean {
    LogService.debug('filterJson');
    LogService.debug(json);
    let status = json.status;
    switch (status) {
      case 0:
        return true;
      case 20011:
        if(toastr){
          toastr.warning("用户未登录,请登录后操作", null, {positionClass: 'toast-top-center'})
        }
        break;
      default:
        if (toastr){
          toastr.warning(json.msg, null, {positionClass: 'toast-top-center'})
        }
    }
    return false;
  }

}
