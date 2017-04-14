import {Component, OnInit} from '@angular/core';
import {UserInfoModel} from "../../model/user-info-model";
import {UserService} from "../../service/user.service";
import {CookieService} from "../../service/cookie-service.service";
import {LogService} from "../../service/log.service";

@Component({
  selector: 'app-user-aside',
  templateUrl: './user-aside.component.html',
  styleUrls: ['./user-aside.component.scss']
})
export class UserAsideComponent implements OnInit {

  currentUser: UserInfoModel;

  constructor(private userService: UserService) {
    this.currentUser = this.userService.currentUser();
  }

  ngOnInit() {
  }

}
