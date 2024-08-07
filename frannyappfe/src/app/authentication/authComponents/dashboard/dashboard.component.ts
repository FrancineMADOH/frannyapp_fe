import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject,Observable } from 'rxjs';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { BeautyService } from 'src/app/beauty/services/beauty.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user:any = {};
  email!:string
  fcbk!:SafeHtml
  twitter!:SafeHtml
  linked!:SafeHtml
  notifs:Notification[] = [];

  constructor(private auth: AuthService, 
    public sanitized:DomSanitizer,
    private beauty:BeautyService,

    private route:ActivatedRoute ){
  }
  ngOnInit(): void {
  this.email = this.route.snapshot.params['email'];
   this.auth.getAdminInfos(this.email).subscribe((res:any)=>{
    this.user = res;
    this.fcbk = this.sanitized.bypassSecurityTrustHtml(res.facebook_url);
    this.linked = this.sanitized.bypassSecurityTrustHtml(res.linkedin_url);
    this.twitter = this.sanitized.bypassSecurityTrustHtml(res.twitter_url);

   // this.email = this.auth.getEmail();

    this.beauty.getallNotif().subscribe((res)=>{
      res.map((el:any)=>{
        this.notifs.push(el);
      });

    })
  

    });
  }

  logOut():void{
    this.auth.logout();
  }

}
