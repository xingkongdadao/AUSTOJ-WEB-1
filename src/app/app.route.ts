import { Routes} from "@angular/router";
import {IndexComponent} from "./home/index/index.component";
import {LoginComponent} from "./home/login/login.component";
import {RegisterComponent} from "./home/register/register.component";


export const appRoutes: Routes = [
  {
    path:'',
    component: IndexComponent,
    pathMatch:'full'
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
    path:'start',
    loadChildren:'./content/content.module#ContentAndAsideModule'
  },
  {
    path:'**',
    loadChildren:'./content/content.module#ContentAndAsideModule'
  },
];
