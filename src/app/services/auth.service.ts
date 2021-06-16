import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartChannelService } from './cart-channel.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authChannel$ : BehaviorSubject<[boolean,String]> = new BehaviorSubject([this.isAuth(),this.isRole()]);

  constructor(private cartChannelService : CartChannelService) { }

  public authenticate(role:String) {
     localStorage['isAuth'] = true; 
     localStorage['role'] = role ; 
     this._authChannel$.next([true,role]);
  }

  public deauthenticate() {
    localStorage.removeItem('isAuth');
    localStorage.removeItem('role') ; 
    this._authChannel$.next([false,""]);
    this.cartChannelService.resetCart();
    document.location.href = "/";
    
  }

  public isAuth() {
    return localStorage['isAuth'] || false;
  }
  public isRole() 
  {
     return localStorage['role'] || "" ; 
  }

  public get authChannel$() : BehaviorSubject<[boolean,String]> {
    return this._authChannel$;
  }


}
