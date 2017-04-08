import { Component, OnInit } from '@angular/core';
import {TagModel} from "../../model/tag-model";
import {Http} from "@angular/http";
import {Config} from "../../model/config";
import {LogService} from "../../service/log.service";

@Component({
  selector: 'app-tags-aside',
  templateUrl: './tags-aside.component.html',
  styleUrls: ['./tags-aside.component.scss']
})
export class TagsAsideComponent implements OnInit {

  tags: Array<TagModel>;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getTags();
  }

  getTags(){
    this.http.get(Config.url_tags_aside).toPromise()
      .then(response => response.json())
      .then(x => {
        if (x.status == 0){
          this.tags = x.data as TagModel[];
        }
      })
      .catch(LogService.handleError)
  }

}
