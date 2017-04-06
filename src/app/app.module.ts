import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";

import { BsDropdownModule } from 'ng2-bootstrap';
import { TooltipModule } from 'ng2-bootstrap';
import {RouterModule} from "@angular/router";
import {appRoutes} from "./app.route";
import { ScrollCheckDirective } from './directive/scroll-check.directive';
import {IndexComponent} from "./home/index/index.component";
import {LoginComponent} from "./home/login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    LoginComponent,
    ScrollCheckDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),//路由
    //bootstrap
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
