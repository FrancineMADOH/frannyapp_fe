import { Component, OnInit, ViewChild,  } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { Admin } from '../../models/admin';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
  providers:[AuthService]
})
export class SignupFormComponent  implements OnInit{
  faArrowRight = faArrowRight;
  successMessage: string ="";
  serverErrorMessage:string;
  activ:string ="";
  url_expression = '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})' ;
  email_expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  @ViewChild("signupForm",{static:true})signupForm:any;
  admin!:Admin; 

 
  constructor(public auth: AuthService, private router:Router){
    this.serverErrorMessage = '';
  } 

  ngOnInit(): void {
    this.activ = new  Date().toLocaleString();  
  }
  createAdmin(signupForm:any){
      if(this.signupForm.valid){
        this.admin = this.signupForm.value;
        this.auth.createAdmin(this.admin).subscribe((res:any)=>{
        if(res.message == "A user with this email already exists"){
          this.serverErrorMessage = res.message;
          alert(this.serverErrorMessage);
        }else{
          this.successMessage = res.message;
           alert(this.successMessage);
           this.router.navigate(['/login'])
        }
        
        });
      }
    this.signupForm.reset();
    
  }
//https://www.angularjswiki.com/httpclient/post/
//https://stackblitz.com/edit/angular-ivy-eqbltt?file=src%2Fapp%2Fservices%2Fcustomvalidation.service.ts,src%2Fapp%2Ftemplate-driven-form%2Ftemplate-driven-form.component.html

}


