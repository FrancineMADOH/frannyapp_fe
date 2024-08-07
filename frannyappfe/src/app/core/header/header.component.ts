import { Component, OnInit } from '@angular/core';
import { Router, RouterLink,ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { BeautyService } from 'src/app/beauty/services/beauty.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone:true,
  imports: [NgbCollapseModule, RouterLink,CommonModule,BrowserModule]
})
export class HeaderComponent implements OnInit {
  navbarCollapse:boolean = true;
  email!:string;
  notifs:Notification[] = [];

  constructor(public auth:AuthService,
    private beauty:BeautyService,
     private activateRoute:ActivatedRoute){
  }

  ngOnInit() {
    this.email = this.auth.getEmail();

    // this.beauty.getallNotif().subscribe((res)=>{
    //   res.map((el:any)=>{
    //     this.notifs.push(el);
    //   });

    // })
  }
  
}
