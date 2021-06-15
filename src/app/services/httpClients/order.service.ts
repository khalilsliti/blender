import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BACKEND_URL = 'http://127.0.0.1:3000';
const API = {
  get: `${BACKEND_URL}/orders/`,
  edit: `${BACKEND_URL}/orders/` 
  
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
   
  constructor(private http: HttpClient) 
  { }
   
  public getOrders(pageNum : Number):Observable<any> {
    return this.http.get(API.get + pageNum);
  }
  public acceptOrder(id : any ) 
   { 
      return this.http.put(API.get + id , { 'accepted': 'true' }) ; 
   }
  public denyOrder(id : any ) 
  {
     return this.http.put(API.get + id , { 'accepted': 'false' }); 
  }
}
