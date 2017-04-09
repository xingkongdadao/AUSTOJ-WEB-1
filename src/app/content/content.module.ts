import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {childRouter} from "./content.router";
import {TipsComponent} from "./tips/tips.component";
import {ArticleAsideComponent} from "../aside/article-aside/article-aside.component";
import {TagsAsideComponent} from "../aside/tags-aside/tags-aside.component";
import {CatelogAsideComponent} from "../aside/catelog-aside/catelog-aside.component";
import {UserAsideComponent} from "../aside/user-aside/user-aside.component";
import {ContentAndAsideComponent} from "./content.component";
import {ProblemTableComponent} from "./problem-table/problem.table.component";
import {PaginationModule, TooltipModule} from "ng2-bootstrap";
import {FormsModule} from "@angular/forms";
import { ContestComponent } from './contest/contest.component';
import { RankComponent } from './rank/rank.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(childRouter),
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule
  ],
  declarations: [
    //该模块的入口,因此一定要包含进来
    ContentAndAsideComponent,
    TipsComponent, ArticleAsideComponent,
    TagsAsideComponent, CatelogAsideComponent,
    UserAsideComponent,ProblemTableComponent, ContestComponent, RankComponent
  ],
})
export class ContentAndAsideModule { }
