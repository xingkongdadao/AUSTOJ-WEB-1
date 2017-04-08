import { Component, OnInit } from '@angular/core';
import {CatelogModel} from "../../model/catelog-model";
import {Http} from "@angular/http";
import {Config} from "../../model/config";
import {LogService} from "../../service/log.service";

@Component({
  selector: 'app-catelog-aside',
  templateUrl: './catelog-aside.component.html',
  styleUrls: ['./catelog-aside.component.scss']
})
export class CatelogAsideComponent implements OnInit {

  catelogs: CatelogModel[];

  constructor(private http: Http) { }

  ngOnInit() {
    this.getCatelogs();
  }

  getCatelogs(){
    this.http.get(Config.url_catelogs).toPromise()
      .then(response => response.json())
      .then(x => {
        if (x.status == 0){
          this.catelogs = x.data as CatelogModel[];
        }
      })
      .catch(LogService.handleError)
  }

}
