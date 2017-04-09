import { Component, OnInit } from '@angular/core';
import {ProblemTableModel} from "../../model/problem-table-model";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {


  problems: ProblemTableModel[];
  public totalItems: number = 0;
  public currentPage: number = 1;

  constructor() { }

  ngOnInit() {
  }

  /**
   * 当前页监听
   * @param event
   */
  public pageChanged(event:any):void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }


}
