import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Beautifyer } from '../models/beautifyer';
import { environment } from 'src/app/environment/env';
import { Faq } from '../models/faq';
import { Prestation } from '../models/prestation';
import { Rendezvous } from '../models/rdv';
import { Review } from '../models/review';
import { Notification } from '../models/notification';
import { catchError,map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BeautyService {

  constructor(private http:HttpClient) {
   }

   //beautifyers service
  getBeautifyerList():Observable<Beautifyer[]>{
    return this.http.get<Beautifyer[]>(environment.baseUrl + "/beautifyers" ).pipe(catchError(this.handleError));
  }
  updateBeautifyer(id:number,beauty:Beautifyer):Observable<any>{
    return this.http.put<Beautifyer>(environment.baseUrl + `/beautifyers/update/${id}` , {id,beauty}).pipe(catchError(this.handleError));
  }
  deleteBeautifyer(id:number):Observable<Beautifyer>{
    return this.http.delete<Beautifyer>(environment.baseUrl + "beautifyers/delete" + id).pipe(catchError(this.handleError));
  }
  addBeautifyer(beauti:Beautifyer):Observable<any>{
    return this.http.post<Beautifyer>(environment.baseUrl + "/beautifyers", beauti).pipe(catchError(this.handleError));
  }
  getBeautifyers(id:number): Observable<Beautifyer>{
    return this.http.get<Beautifyer>(environment.baseUrl + `/beautifyers/${id}`).pipe(catchError(this.handleError));
  }

  //faq service
  getFaqList():Observable<Faq[]>{
    return this.http.get<Faq[]>(environment.baseUrl + "/faqs" ).pipe(catchError(this.handleError));
  }
  deleteFaq(id:number):Observable<Faq>{
    return this.http.delete<Faq>(environment.baseUrl + `/faqs/${id}`).pipe(catchError(this.handleError));
  }
  getFaqbyCategory():Observable<Faq[]>{
    return this.http.get<Faq[]>(environment.baseUrl + "faq/category" ).pipe(catchError(this.handleError));
  }

  addNewFaq(faq:Faq):Observable<Faq>{
    return this.http.post<Faq>(environment.baseUrl + "/faqs",faq).pipe(catchError(this.handleError));
  }

  //prestation service

  addNewPrestation(pres:Prestation):Observable<Prestation>{
    return this.http.post<Prestation>(environment.baseUrl + "/prestations/",pres).pipe(catchError(this.handleError));
  }
  updatePrestation(id:number,prestation:Prestation):Observable<Prestation[]>{
    return this.http.put<Prestation>(environment.baseUrl + `/prestations/${id}`,{prestation}).pipe(catchError(this.handleError));
  }
  getPrestationList():Observable<Prestation[]>{
    return this.http.get<Prestation[]>(environment.baseUrl + "/prestations" ).pipe(catchError(this.handleError));
  }

  getPrestation(id:number):Observable<any>{
    return this.http.get(environment.baseUrl + `/prestations/${id}`).pipe(catchError(this.handleError));
  }

  getPrestationBCategory(category:string):Observable<any>{
    return this.http.get(environment.baseUrl + `/prestations/category/${category}`).pipe(catchError(this.handleError));

  }
  //rendez vous service
  createRendezvous(rdv:Rendezvous):Observable<Rendezvous>{
    return this.http.post<Rendezvous>(environment.baseUrl + "/rendezvous",rdv).pipe(catchError(this.handleError));
  }
  getRendezvousList():Observable<Rendezvous[]>{
    return this.http.get<Rendezvous[]>(environment.baseUrl + "/rendezvous" ).pipe(catchError(this.handleError));
  }
  getRendezvous(id:number): Observable<Rendezvous>{
    return this.http.get<Rendezvous>(environment.baseUrl +`/rendezvous/view/${id}` ).pipe(catchError(this.handleError));
  }
  updateRendezvous(id:number,rdv:Rendezvous):Observable<Rendezvous>{
    return this.http.put<Rendezvous>(environment.baseUrl + `/rendezvous/${id}`,{rdv}).pipe(catchError(this.handleError));
  }
  assignRendezvous(id:number,doneby:string,rdvstate:string,date:string,
    heure:string,email:string,category:string,title:string,name:string):Observable<Rendezvous>{
    return this.http.put<Rendezvous>(environment.baseUrl + `/rendezvous/assign/${id}`,{doneby,rdvstate,date,heure,email,category,title,name}).pipe(catchError(this.handleError));
  }
  cancelRendezvous(id:number,rdvstate:string,cancellation_reason:string):Observable<Rendezvous>{
    return this.http.put<Rendezvous>(environment.baseUrl + `/rendezvous/cancel/${id}`,{rdvstate,cancellation_reason}).pipe(catchError(this.handleError));
  }

  makepaiement(id:number,rdvstate:string,pm:string, bname:string,email:string,rdvdate:string,link:string,client:string){
    return this.http.put<Rendezvous>(environment.baseUrl + `/rendezvous/payment/${id}`,
    {rdvstate,pm,
      bname,
      email,
      rdvdate,
      link,
      client
    }).pipe(catchError(this.handleError));
  }

  getMetrics():Observable<any>{
    return this.http.get<any>(environment.baseUrl + '/rendezvous/metrics').pipe(catchError(this.handleError));
  }

  topEarners():Observable<any>{
    return this.http.get<any>(environment.baseUrl + '/rendezvous/topEarners').pipe(catchError(this.handleError));
  }
  topPrestation():Observable<any>{
    return this.http.get<any>(environment.baseUrl + '/rendezvous/topPrestation').pipe(catchError(this.handleError));
  }

  // Notification

  createNotif(phone:string,perso_name:string):Observable<any>{
    return this.http.post<any>(environment.baseUrl + '/notifications',{phone,perso_name}).pipe(catchError(this.handleError));
  }
  getnewNotif():Observable<Notification[]>{
    return this.http.get<any>(environment.baseUrl + '/notifications').pipe(catchError(this.handleError));

  }
  getallNotif():Observable<Notification[]>{
    return this.http.get<any>(environment.baseUrl + '/notifications/new').pipe(catchError(this.handleError));

  }
  resoleveNotif(state:string,comment:string,id:number):Observable<any>{
    return this.http.put<any>(environment.baseUrl + `/notifications/resolve/`,{state,comment,id}).pipe(catchError(this.handleError));
  }

  // getRendezvousByState(state:string):Observable<Rendezvous[]>{/payment/:id
  //   return this.http.get<Rendezvous[]>(environment.baseUrl + "").pipe(catchError(this.handleError));

  // }  use req.query to retreive rdv by state and by a certain period
  // getRendezvousByStateCount(state:string):Observable<number>{
  //   return this.http.get<number>(environment.baseUrl + "/rendezvous/state").pipe(catchError(this.handleError));
  // }
  // cancelrendezvous(id:number){
  //   return this.http.delete<Rendezvous>(environment.baseUrl + "/rendezvous/count"+id).pipe(catchError(this.handleError));

  // }

  //review service
  getReviewList():Observable<Review[]>{
    return this.http.get<Review[]>(environment.baseUrl + "/reviews" ).pipe(catchError(this.handleError));
  }
  addReview(review:Review):Observable<Review>{
    return this.http.post<Review>(environment.baseUrl + "/reviews",review).pipe(catchError(this.handleError));
  }
  getReviewbyId(id:number):Observable<Review>{
    return this.http.get<Review>(environment.baseUrl + `/reviews/${id}`).pipe(catchError(this.handleError));
  }
//https://www.positronx.io/angular-httpclient-http-service/

//handle anny error that occurs
handleError(error:HttpErrorResponse):Observable<any>{
  let errorMessage:any = "";

  if(error.error instanceof ErrorEvent){
    //Client Side error message
    errorMessage = error.message;
    return errorMessage;
    console.log(errorMessage);
  }else {
    //server side error
    errorMessage =  `Error Code: {error.status}\nMessage:${error.message}`
  }
  return errorMessage;
}


}
