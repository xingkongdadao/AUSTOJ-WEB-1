import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";

import { BsDropdownModule } from 'ng2-bootstrap';
import { TooltipModule } from 'ng2-bootstrap';
import {RouterModule} from "@angular/router";
import {appRoutes} from "./app.route";
import {IndexComponent} from "./home/index/index.component";
import {LoginComponent} from "./home/login/login.component";
import { RegisterComponent } from './home/register/register.component';
import 'rxjs/add/operator/toPromise';
import {UserService} from "./service/user.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastModule} from "ng2-toastr/ng2-toastr";
import { EmailCheckComponent } from './home/email-check/email-check.component';
import { ErrorComponent } from './home/error/error.component';
import {ArticleService} from "./service/article.service";
import {ProblemService} from "./service/problem.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    EmailCheckComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),//路由
    //bootstrap
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ToastModule.forRoot()
  ],
  providers: [UserService,ArticleService,ProblemService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
