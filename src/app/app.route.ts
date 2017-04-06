import { Routes} from "@angular/router";
import {IndexComponent} from "./home/index/index.component";
import {LoginComponent} from "./home/login/login.component";


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
];
