
import {Routes} from "@angular/router";
import {ContentAndAsideComponent} from "./content.component";
import {StartComponent} from "./start/start.component";

export const childRouter : Routes = [
  {
    path: '',
    component:ContentAndAsideComponent,
    children:[
      {path:'',redirectTo:'start',pathMatch:'full'},
      {path:'start',component:StartComponent}
    ]
  }
  ];
