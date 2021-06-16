import { Injectable } from '@angular/core';

import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartChannelService {
 
  private _cartChannel$ : Subject<any> = new Subject<any>();
  private _uploadingChannel$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  


  constructor() { }

  public push(product) {
    
    this._cartChannel$.next(product);
  }


  public get cartOrders() {
   
      return (localStorage['orders']) ? JSON.parse(localStorage['orders']) : [];
  }

  public set cartOrders(orders) {
    localStorage['orders'] = JSON.stringify(orders);
  }


  
  public get cartTotalPrice() {
   
    return (localStorage['totalPrice']) ? JSON.parse(localStorage['totalPrice']) : 0 ;
}

public set cartTotalPrice(totalPrice) {
  localStorage['totalPrice'] = JSON.stringify(totalPrice);
}

public resetCart(){
  localStorage.removeItem('totalPrice');
  localStorage.removeItem('orders');
  
}

public uploading(isUploading){

  this._uploadingChannel$.next(isUploading);
}
  
public get uploadingChannel() {
  return this._uploadingChannel$;
}


  public get cartChannel() {
    return this._cartChannel$;
  }

}
