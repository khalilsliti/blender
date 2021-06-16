import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartChannelService } from './cart-channel.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authChannel$ : BehaviorSubject<boolean> = new BehaviorSubject(this.isAuth());

  constructor(private cartChannelService : CartChannelService) { }

  public authenticate( ) {
     localStorage['isAuth'] = true;
     this._authChannel$.next(true);
  }

  public deauthenticate() {
    localStorage.removeItem('isAuth');
    this.cartChannelService.resetCart();
    this._authChannel$.next(false);
    
  }

  public isAuth() {
    return localStorage['isAuth'] || false;
  }


  public get authChannel$() : BehaviorSubject<boolean> {
    return this._authChannel$;
  }


}
