import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LogService} from "../service/log.service";

@Component({
  selector: 'app-content-and-aside',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentAndAsideComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
