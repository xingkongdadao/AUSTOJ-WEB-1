import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {UserModel} from "../../model/user-model";
import {UserService} from "../../service/user.service";
import {ToastsManager} from ".1.6.0@ng2-toastr";
import {LogService} from "../../service/log.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  /**
   * 主页显示的用户
   */
  indexUpUsers: UserModel[];
  indexDownUsers: UserModel[];

  constructor(private userService: UserService,
              private toastr: ToastsManager,
              vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getIndexUsers();
  }

  /**
   * 获取首页展示用户
   */
  private getIndexUsers() {
    this.userService.fetchIndexUsers()
      .then(json => {
        if (json.status == 0) {
          let indexUsers: UserModel[] = json.data as UserModel[];
          this.indexUpUsers = indexUsers.slice(0, 3);
          this.indexDownUsers = indexUsers.slice(3, 6);
        } else {
          this.toastr.warning("no index users")
        }
      });
  }

}
