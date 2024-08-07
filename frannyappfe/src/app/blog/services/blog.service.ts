import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Post } from '../models/post';
import { environment } from 'src/app/environment/env';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient) { }

  //get blog post list
  getblogpostList():Observable<Post[]>{
    return this.http.get<Post[]>(environment.baseUrl +"/posts").pipe(catchError(this.handleErrors));
  }
  
  viewPost(id:number):Observable<any>{
    return this.http.get<Post>(environment.baseUrl +`/posts/show/${id}`).pipe(catchError(this.handleErrors));
  }

  saveBlogPost(post:any):Observable<Post>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(environment.baseUrl+"/posts", post,{headers}).pipe(catchError(this.handleErrors));
  }

  deletePost(id:number):Observable<Post>{
    return this.http.delete<any>(environment.baseUrl+`/posts/${id}`).pipe(catchError(this.handleErrors));

  }

  //addcomment
  addComment(comment:Comment ):Observable<any>{
    return this.http.post<Comment>(environment.baseUrl + "/comments",{comment}).pipe(catchError(this.handleErrors));
  }
  //count comment 
  countComment():Observable<number>{
    return this.http.get<number>(environment.baseUrl + "/comments/count").pipe(catchError(this.handleErrors));
  }
  //all comments
  getallComment(id:number):Observable<Comment[]>{
    return this.http.get<Comment[]>(environment.baseUrl + `/comments/${id}`).pipe(catchError(this.handleErrors));
  }
  //delete comment
  deleteComment(id:number):Observable<any>{
    return this.http.delete<any>(environment.baseUrl + `/comments/${id}`).pipe(catchError(this.handleErrors));
  }

  //top applause
  topApplause(id:number): Observable<any>{
    return this.http.get<any>(environment.baseUrl + `/posts/topten/${id}`).pipe(catchError(this.handleErrors));

  }
  contactFranny(mailInfos:any){
    return this.http.post<any>(environment.baseUrl + "/contact",mailInfos).pipe(catchError(this.handleErrors));
  }

  // get post by category
  //category/:category
  getpostbyCategory(category:string):Observable<any>{
    return this.http.get<any>(environment.baseUrl + `/posts/category/${category}`).pipe(catchError(this.handleErrors));
  }

  getpostbykpi():Observable<any>{
    return this.http.get<any>(environment.baseUrl + `/posts/kpi`).pipe(catchError(this.handleErrors));
  }
  getposmostCommented():Observable<any>{
    return this.http.get<any>(environment.baseUrl + `/posts/mostreaded`).pipe(catchError(this.handleErrors));
  }
  likeblogPost(id:number,email:string):Observable<any>{
    return this.http.put<any>(environment.baseUrl + `/posts/like/${id}`,{email}).pipe(catchError(this.handleErrors));
  }

editPost(id:number,post:any):Observable<any>{
    return this.http.patch<any>(environment.baseUrl + `posts/${id}/update`,{post}).pipe(catchError(this.handleErrors));
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
