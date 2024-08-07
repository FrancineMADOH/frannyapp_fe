import { HttpClient, HttpEvent } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.css']
})
export class ResetFormComponent implements OnInit {
  faArrowRight = faArrowRight;
  email:string = "";
  newPassword:string = "";
  newPasswordConfirm:string = ""; 
  succesMessage:string = "";
  serverErrorMessage:string = "";
  
  @ViewChild("resetForm",{static:true})resetForm:any;
  
  constructor(private router:Router, private auth: AuthService){}

  ngOnInit(): void {
   
  }

  resetPassword($event:Event){
    $event.preventDefault();
    if(this.resetForm.valid){
      this.email = this.resetForm.value.email;
      this.newPassword = this.resetForm.value.password;
      this.auth.resetPassword(this.email,this.newPassword).subscribe(
        (res:any)=>{
          if(res.message == "No email associate with this account"){
            this.serverErrorMessage = res.message;
            alert(this.serverErrorMessage);
          }else{
            this.succesMessage = res.message; 
            alert(this.succesMessage);
            this.router.navigate(['/login']);
          }
  
        }
      )
      this.resetForm.reset();
    } 
  }
}

 

 


