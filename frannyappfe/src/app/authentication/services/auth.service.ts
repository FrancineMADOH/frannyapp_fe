import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpErrorResponse} from '@angular/common/http';
import { JwtResponse } from '../models/jwt-response';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { Admin } from '../models/admin';
import { environment } from 'src/app/environment/env';
import { Observable, BehaviorSubject,throwError } from 'rxjs';
import { catchError,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders().set("Content-Type", "application/json");
  currentUser = {};
  fcbk!:SafeHtml
  twitter!:SafeHtml
  linked!:SafeHtml

constructor(private http: HttpClient, public router:Router,public sanitized:DomSanitizer) { }

createAdmin(admin: Admin):Observable<Admin>{
    return this.http.post<Admin>(environment.baseUrl + "/admins", admin)
    .pipe(catchError(this.handleError));
    
}

getAllUsers():Observable<Admin[]>{
  return this.http.get<Admin[]>(environment.baseUrl + "/admins")
}

signtheUserIn(email:string,admin_password:string){
  return this.http.post(environment.baseUrl + '/admins/signin', {email,admin_password}).subscribe((res:any)=>{
    if(res.token){
      localStorage.setItem("acces_token", res.token);
      localStorage.setItem("admin_email", email)
      localStorage.setItem("admin_id", res.admin)
      this.router.navigate(['dashboard/' + email]);
    } else{
        alert("Wrong Credentials!");
    }
  })
}

resetPassword(email:string, password:string){
  return this.http.put(environment.baseUrl + '/admins/reset',{email,password})
}

deleteAdmin(id:number){
  return this.http.delete(environment.baseUrl + '/admins/delete')
}

//get the connected admin information
getAdminInfos(email:string): Observable<any>{
  return this.http.get(environment.baseUrl + `/admins/${email}`).pipe(
   map((res:any)=>{
    return res 
   }),
   catchError(this.handleError));
}

getAccesToken(){
  let token =  localStorage.getItem('acces_token');
  return token;
};

isLogin():boolean {
  let authToken = localStorage.getItem('acces_token');
  return (authToken!==null)? true:false;
}
getEmail():string{
  let email = localStorage.getItem('admin_email');
  return email || '';
}

getID():string{
  let admin_id = localStorage.getItem('admin_id')
  return admin_id || ''
}

logout(){
  if(localStorage.removeItem('acces_token') == null){
    localStorage.removeItem("admin_email")
    this.router.navigate(['/login']);
  }
}

//handle anny error that occurs
handleError(error:HttpErrorResponse):Observable<any>{
  let errorMessage:any = "";

  if(error.error instanceof ErrorEvent){
    //Client Side error message
    errorMessage = error.message;
  }else {
    //server side error
    errorMessage =  `Error Code: {error.status}\nMessage:${error.message}`
  }
  return errorMessage;
} 
}



