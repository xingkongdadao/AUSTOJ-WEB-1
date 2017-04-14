import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ContestModel} from "../../model/contest-model";
import {ProblemTableModel} from "../../model/problem-table-model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {ContestService} from "../../service/contest.service";
import {LogService} from "../../service/log.service";

@Component({
  selector: 'app-contest-table',
  templateUrl: './contest-table.component.html',
  styleUrls: ['./contest-table.component.scss']
})
export class ContestTableComponent implements OnInit {

  contest: ContestModel;

  problems: ProblemTableModel[];

  constructor( private route: ActivatedRoute,
               private router: Router,
               private toastr: ToastsManager,
               private contestService: ContestService,
               private vr : ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vr)
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        return this.contestService.getContest(params['id'])
      })
      .subscribe(x => {
        LogService.debug("ContestTableComponent"+x);
        if (LogService.filterJson(x,this.toastr)){
          this.problems = x.data.contents as ProblemTableModel[];
          this.contest = x.data as ContestModel;
        }
      });
  }

}
