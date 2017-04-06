import { Directive } from '@angular/core';
import {LogService} from "../service/log.service";

@Directive({
  selector: '[appScrollCheck]'
})
export class ScrollCheckDirective {
  marginTop: number;
  constructor() {
    let self = this;

  }
}
