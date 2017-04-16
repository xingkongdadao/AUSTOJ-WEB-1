import {AfterViewInit, Directive, ElementRef, Input, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {UserInfoModel} from "../model/user-info-model";

@Directive({
  selector: '[appProblemHight]'
})
export class ProblemHightDirective implements AfterViewInit{

  @Input()
  problemId: number;

  currentUser: UserInfoModel;

  constructor(
    private el: ElementRef,
    private userService: UserService
  ) {
    this.currentUser = userService.currentUser()
  }


  ngAfterViewInit(): void {
    if (this.currentUser){
      //input传入的值必须转换一下,否则一直为false,未解之谜...
      let any = this.currentUser.aCProblems.includes(Number.parseInt(this.problemId.toString()));
      if (any){
        this.el.nativeElement.style.color = '#1abc9c';
      }
    }
  }
}
