
import {Routes} from "@angular/router";
import {ContentAndAsideComponent} from "./content.component";
import {ProblemTableComponent} from "./problem-table/problem.table.component";
import {RankComponent} from "./rank/rank.component";
import {ProblemComponent} from "./problem/problem.component";
import {SubmitTableComponent} from "./submit-table/submit-table.component";
import {ContestComponent} from "./contest/contest.component";
import {ContestTableComponent} from "./contest-table/contest-table.component";

export const childRouter : Routes = [
  {
    path: '',
    component:ContentAndAsideComponent,
    children:[
      {path:'',redirectTo:'/index',pathMatch:'full'},
      {path:'start',component:ProblemTableComponent},
      {path:'practice',component:ProblemTableComponent},
      {path:'master',component:ProblemTableComponent},
      {path:'rank',component:RankComponent},
      {path:'submit',component:SubmitTableComponent},
      {path:'problem/:id',component:ProblemComponent},
      {path:'contest',component:ContestComponent},
      {path:'contest/:id',component:ContestTableComponent},
    ]
  }
  ];
