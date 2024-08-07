import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './authComponents/login-form/login-form.component';
import { SignupFormComponent } from './authComponents/signup-form/signup-form.component';
import { ResetFormComponent } from './authComponents/reset-form/reset-form.component';
import { DashboardComponent } from './authComponents/dashboard/dashboard.component';
import { CoreModule } from '../core/core.module';
import { BeautyModule } from '../beauty/beauty.module';



@NgModule({
  declarations: [
    LoginFormComponent,
    SignupFormComponent,
    ResetFormComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule ,
    ReactiveFormsModule,
    CoreModule,
    BeautyModule
  ],
  exports: [
    LoginFormComponent,
    SignupFormComponent,
    ResetFormComponent,
    DashboardComponent
  ],
  providers: [
  
  ],
})
export class AuthenticationModule {
  constructor(){
   
  }
 }
