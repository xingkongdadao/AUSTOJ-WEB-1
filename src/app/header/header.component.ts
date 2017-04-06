import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isBackColor: boolean = false;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.isAddBackColor();
  }

  //判断是否为首页
  getIsIndex(){
    return this.router.url === "/"
  }

  //判断是否需要加背景色
  isAddBackColor(){
    if (this.getIsIndex()){
      //监听事件这样添加才有效果
      window.addEventListener('scroll',() => {
        let marginTop = document.body.scrollTop|| document.documentElement.scrollTop;
        this.isBackColor = marginTop > 20;
      });
    }
  }


}
