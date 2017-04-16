import { Component, OnInit } from '@angular/core';
import {UserRankModel} from "../../model/user-rank-model";
import {UserService} from "../../service/user.service";
import {LogService} from "../../service/log.service";

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
})
export class RankComponent implements OnInit {

  totalUserRanks: UserRankModel[];
  userRanks: UserRankModel[];
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 20;
  startId: number = 1;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getTotalRankUsers()
  }

  /**
   * 当前页监听
   * @param event
   */
  public pageChanged(event:any):void {
    this.currentPage = event.page;
    this.getRankUsers();
  }

  /**
   * 拿到当前页的排名用户
   */
  getRankUsers(){
    this.userRanks = null;
    window.setTimeout(() => {
      if (this.totalUserRanks && this.totalUserRanks.length > 0){
        this.startId = (this.currentPage -1 ) * this.pageSize + 1;
        this.userRanks = this.totalUserRanks.slice(this.startId,this.startId+this.pageSize);
      }
    },500)
  }

  /**
   * 得到全部排名用户
   */
  getTotalRankUsers(){
    this.userRanks = null;
    window.setTimeout(() => {
      this.userService.fetchRankUsers()
        .then(x => {
          if (x.status == 0) {
            this.totalUserRanks = x.data as UserRankModel[];
            this.userRanks = this.totalUserRanks.slice(0,this.pageSize);
            this.totalItems = this.totalUserRanks.length;
          }
        })
    },500);
  }

}
