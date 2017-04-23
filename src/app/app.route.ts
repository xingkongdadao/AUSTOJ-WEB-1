import { Routes} from "@angular/router";
import {IndexComponent} from "./home/index/index.component";
import {LoginComponent} from "./home/login/login.component";
import {RegisterComponent} from "./home/register/register.component";
import {EmailCheckComponent} from "./home/email-check/email-check.component";
import {ErrorComponent} from "./home/error/error.component";


export const appRoutes: Routes = [
  {
    path:'',
    component: IndexComponent,
    pathMatch:'full'
  },
  {
    path:'index',
    component: IndexComponent,
  },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'register/check/token',
    component:EmailCheckComponent
  },
  {
    path:'error',
    component:ErrorComponent
  },
  {
    path:'aust',
    loadChildren:'./content/content.module#ContentAndAsideModule'
  },
  {
    path:'**',
    loadChildren:'./content/content.module#ContentAndAsideModule'
  },
];
