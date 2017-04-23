import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LogService} from "./service/log.service";
import {UserService} from "./service/user.service";

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls:['./app.component.css']
})
export class AppComponent implements OnInit{


  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }
  //刷新用户信息
  ngOnInit(): void {
    let currentUser = this.userService.currentUser();
    if (currentUser){
      this.userService.freshCurrentUser(currentUser.id,true);
    }
  }
  //判断是否显示头部和尾部
  isShowHeaderAndFooter(): boolean{
    let url = this.router.url;
    if (url.includes('login') || url.includes('register')
      || url.includes('emailcheck') || url.includes('error')){
      return false;
    }
    return true;
  }
}

