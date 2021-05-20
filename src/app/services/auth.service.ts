import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authChannel$ : BehaviorSubject<boolean> = new BehaviorSubject(this.isAuth());

  constructor() { }

  public authenticate( ) {
     localStorage['isAuth'] = true;
     this._authChannel$.next(true);
  }

  public deauthenticate() {
    localStorage.removeItem('isAuth');
    this._authChannel$.next(false);
  }

  public isAuth() {
    return localStorage['isAuth'] || false;
  }


  public get authChannel$() : BehaviorSubject<boolean> {
    return this._authChannel$;
  }




}
