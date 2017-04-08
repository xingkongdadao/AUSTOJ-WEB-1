import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  static isDebug: boolean = true;

  constructor() { }

  static debug(msg: any){
    if (this.isDebug){
      console.log(msg)
    }
  }

  static errorMsg(msg: any){
    console.error(msg)
  }
  static error(msg: any,error: any){
    console.error(msg,error)
  }

  /**
   * 处理请求中的错误
   * @param error 错误
   * @returns {Promise<never>}
   */
  static handleError(error: any): Promise<any> {
    LogService.error('fetch user error',error);
    return Promise.reject(error.message || error);
  }
}
