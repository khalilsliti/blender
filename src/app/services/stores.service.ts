import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const  url="http://127.0.0.1:3000/stores"
@Injectable(
    {
  providedIn: 'root'
    })

export class StoresService 
{

  constructor(private http:HttpClient) {}


   public getStores(pageNum : Number) : Observable<any> 
   {
    return this.http.get(`${url}/${pageNum}`);
   }
  
}
