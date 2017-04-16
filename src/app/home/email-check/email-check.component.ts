import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {Http} from "@angular/http";
import {Config} from "../../model/config";

@Component({
  selector: 'app-email-check',
  templateUrl: './email-check.component.html',
  styleUrls: ['./email-check.component.scss']
})
export class EmailCheckComponent implements OnInit {

  checkMsg: string = '验证中......';

  emailToken: string;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastsManager,
    vr: ViewContainerRef,
    private http: Http
  ) {
    this.toastr.setRootViewContainerRef(vr);
    this.emailToken = route.snapshot.queryParamMap.get("token")
    if (!this.emailToken){
      this.toastr.error("验证失败,token不存在");
    }
  }

  ngOnInit() {
    this.http.get(Config.url_email_check).toPromise()
      .then(response => response.json())
      .then(x => {
        if (x.status == 0){
          this.toastr.success("验证成功,该网页稍后自动关闭");
          this.checkMsg = '验证成功,该网页稍后自动关闭';
          window.setTimeout(() => {
            window.close();
          },2000)
        }else {
          this.toastr.error(x.msg);
        }
      })
  }

}
