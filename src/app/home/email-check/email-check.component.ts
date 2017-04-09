import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-check',
  templateUrl: './email-check.component.html',
  styleUrls: ['./email-check.component.scss']
})
export class EmailCheckComponent implements OnInit {

  checkMsg: string = '验证中......';

  constructor() { }

  ngOnInit() {

  }

}
