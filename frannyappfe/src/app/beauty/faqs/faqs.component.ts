import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  constructor(private auth:AuthService){}
  isauth!:boolean;

  ngOnInit(): void {
  this.isauth = this.auth.isLogin();   
  }


}
