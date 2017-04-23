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
import {ModalModule, PaginationModule, TabsModule, TooltipModule} from "ng2-bootstrap";
import {FormsModule} from "@angular/forms";
import { ContestComponent } from './contest/contest.component';
import { RankComponent } from './rank/rank.component';
import { ProblemComponent } from './problem/problem.component';
import { SubmitTableComponent } from './submit-table/submit-table.component';
import { ContestTableComponent } from './contest-table/contest-table.component';
import { CatelogProblemComponent } from './catelog-problem/catelog-problem.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article/article.component';
import {ProblemHightDirective} from "../directive/problem-hight.directive";
import {SolutionHightDirective} from "../directive/solution-hight.directive";
import { DiscussComponent } from './discuss/discuss.component';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(childRouter),
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    TabsModule.forRoot(),
  ],
  declarations: [
    //该模块的入口,因此一定要包含进来
    ContentAndAsideComponent,
    TipsComponent, ArticleAsideComponent,
    TagsAsideComponent, CatelogAsideComponent,
    UserAsideComponent,ProblemTableComponent, ContestComponent,
    RankComponent, ProblemComponent, SubmitTableComponent, ContestTableComponent,
    CatelogProblemComponent,
    ArticleListComponent,
    ArticleComponent,
    ProblemHightDirective,SolutionHightDirective, DiscussComponent, UserInfoComponent,
  ],
})
export class ContentAndAsideModule { }
