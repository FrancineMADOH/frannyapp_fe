import { Injectable } from '@angular/core';
import { environment } from '../environment/env';
import { catchError , Observable} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http:HttpClient) { }

  contactFranny(mailInfos:any){
    return this.http.post<any>(environment.baseUrl + "/users/contact",mailInfos).pipe(catchError(this.handleErrors));
  }

  //handle errors
  handleErrors(error:HttpErrorResponse ):Observable <any>{
    let errorMessage:any ="";

    if(error.error.code instanceof Error){
      errorMessage = error.message;
      console.log(errorMessage);
      return errorMessage;
    }else{
      //server side error
      errorMessage = `Error Code:${error.status} Message:${error.message}`;
      return errorMessage;
    }
   // return errorMessage;
  }
}
