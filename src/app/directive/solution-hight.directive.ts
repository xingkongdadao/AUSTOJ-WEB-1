import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {LogService} from "../service/log.service";

@Directive({
  selector: '[appSolutionHight]'
})
export class SolutionHightDirective implements AfterViewInit{

  @Input()
  judgeCode: string;

  constructor(
    private el: ElementRef
  ) {

  }

  ngAfterViewInit(): void {
    switch (Number.parseInt(this.judgeCode)){
      case 0:
        this.el.nativeElement.style.color = '#1abc9c';
        break;
      case 1:
        this.el.nativeElement.style.color = '#1abc9c';
        break;
      case 2:
        this.el.nativeElement.style.color = '#1abc9c';
        break;
      default:
        this.el.nativeElement.style.color = 'red';
    }
  }
}
