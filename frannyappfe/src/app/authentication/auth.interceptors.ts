import { Injectable } from "@angular/core";
import { HttpInterceptor,HttpRequest,HttpHandler, HttpEvent } from "@angular/common/http";
import { AuthService } from "./services/auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    /*
    create ann HTTP interceptor that will be used to attach
    the JWT access token to the authorization header of the ongoing requests.
    */

    constructor(private auth:AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const accesToken = this.auth.getAccesToken();

        req = req.clone({
            setHeaders : {
                Authorization:   `JWT ${accesToken}`//[]
            }
        });

        return next.handle(req);        
    }
}

