import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Route,Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './authentication/services/auth.service';


@Injectable({
  providedIn: 'root'
})
class PermissionsService {

  constructor(private router: Router,public auth:AuthService, ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if(this.auth.isLogin() !== true){
        alert("Access denied!");
        this.router.navigate(["/login"])
      }
      return true;
  }
  
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
}



// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(public auth:AuthService, public router:Router){}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     if(this.auth.isLogin !== true){
//       alert("Access denied!");
//       this.router.navigate(["/login"])
//     }
//       return true;
//   }
  
// }