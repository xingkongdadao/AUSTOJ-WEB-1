import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LogService} from "./service/log.service";

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls:['./app.component.css']
})
export class AppComponent implements OnInit{


  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }
  //判断是否显示头部和尾部
  isShowHeaderAndFooter(): boolean{
    let url = this.router.url;
    if (url.indexOf('login')>0 || url.indexOf('register')>0 ){
      return false;
    }
    return true;
  }
}

