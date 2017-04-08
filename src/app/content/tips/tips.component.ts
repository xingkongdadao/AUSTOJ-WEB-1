import { Component, OnInit } from '@angular/core';
import {TipsModel} from "../../model/tip-model";
import {Http} from "@angular/http";
import {Config} from "../../model/config";
import {LogService} from "../../service/log.service";

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent implements OnInit {

  tips: TipsModel[];

  constructor(private http: Http) { }

  ngOnInit() {
    this.getTips();
  }

  /**
   * 得到网站通知
   */
  getTips(){
    this.http.get(Config.url_tips).toPromise()
      .then(response => response.json())
      .then(x => this.tips = x.data as TipsModel[])
      .catch(LogService.handleError)
  }

}
