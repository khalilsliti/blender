import { Injectable, OnInit } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({
    providedIn: "root" 
})  
export class authGuard implements CanActivate  
{ 
     public isAuth :boolean ; 
    constructor(private auth : AuthService , private router:Router) {
        
    }; 
   
     canActivate(route: ActivatedRouteSnapshot, router : RouterStateSnapshot) : boolean | UrlTree | Observable<boolean | UrlTree> 
     
     {
         this.auth.authChannel$.subscribe( val => 
            {
               this.isAuth = val[0] ;  
            });
            return this.isAuth ? true : this.router.createUrlTree(['/home']) ;  
     }
}  