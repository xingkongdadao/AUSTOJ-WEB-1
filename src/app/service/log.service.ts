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
}
