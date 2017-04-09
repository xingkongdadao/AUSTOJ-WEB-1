
import {Routes} from "@angular/router";
import {ContentAndAsideComponent} from "./content.component";
import {ProblemTableComponent} from "./problem-table/problem.table.component";
import {RankComponent} from "./rank/rank.component";

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
    ]
  }
  ];
