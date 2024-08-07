import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRight, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  faArrowRight = faArrowRight;
  faEnvelope = faEnvelope;
  message = "";
  email = "";
  password = "";
  succesMessage = "";

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  @ViewChild("loginForm", { static:true}) loginForm:any;
  constructor(private router: Router, 
    private auth: AuthService) {
  }

  ngOnInit(): void {

  }
  //https://www.techiediaries.com/angular-14-user-authentication-service/

  singinAdmin(loginForm:any) {
    if (this.loginForm.valid) {
      this.email = this.loginForm.value.email;
      this.password = this.loginForm.value.admin_password;
      this.auth.signtheUserIn(this.email,this.password);
      this.loginForm.reset();
   }

  }}
//https://therichpost.com/angular-12-showing-postgresql-data-using-nodejs-express-web-api/