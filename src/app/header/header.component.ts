import {Component, DoCheck, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserInfoModel} from "../model/user-info-model";
import {UserService} from "../service/user.service";
import {CookieService} from "../service/cookie-service.service";
import {LogService} from "../service/log.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  isBackColor: boolean = false;
  currentUser: UserInfoModel;

  constructor(private router: Router,
  private userService: UserService) {
    this.currentUser = this.userService.currentUser();
  }

  ngOnInit() {
    this.isAddBackColor();
  }

  /**
   * 用户退出
   */
  loginOut(){
    CookieService.addCookie("currentUser",null,-10);
    //刷新本页面
    window.location.reload();
  }

  /**
   * 判断是否为首页
   * @returns {boolean}
   */
  getIsIndex(){
    return this.router.url === "/" || this.router.url === "/index"
  }

  /**
   * 判断是否需要加背景色
   * 使用isBackColor控制结果
   */
  isAddBackColor(){
    if (this.getIsIndex()){
      //监听事件这样添加才有效果
      window.addEventListener('scroll',() => {
        let marginTop = document.body.scrollTop|| document.documentElement.scrollTop;
        this.isBackColor = marginTop > 20 && this.getIsIndex();
      });
    }
  }


}
