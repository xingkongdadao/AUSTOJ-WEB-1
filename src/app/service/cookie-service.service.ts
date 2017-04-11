import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {

  constructor() { }

  /**
   * 添加cookies,默认浏览器关闭时过期
   * @param name 键
   * @param value 值
   * @param expireHours 过期时间,单位小时
   */
  static addCookie(name:string, value:any,expireHours: number = -1){
    if (expireHours == -1){
      document.cookie = encodeURIComponent(String(name)) + '=' + encodeURIComponent(String(value))+';path=/';
    }else {
      let tempDate = new Date();
      tempDate.setTime(tempDate.getTime()+expireHours*3600*1000);
      document.cookie = encodeURIComponent(String(name)) + '=' + encodeURIComponent(String(value)) + ';expires= '+tempDate.toUTCString()+'; path=/';
    }
  }

// 获取Cookie
  static getCookie(name:string) {
  if (name != null) {
    let value = new RegExp('(?:^|; )' + encodeURIComponent(String(name)) + '=([^;]*)').exec(document.cookie);
    return value ? decodeURIComponent(value[1]) : null;
  }
}


}
