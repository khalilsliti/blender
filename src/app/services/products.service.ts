import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Models/Product';
const  url="http://127.0.0.1:3000/products"
@Injectable({
  providedIn: 'root'
})

export class ProductsService {
 
  constructor(private http:HttpClient) { }

  public getProducts(pageNum : Number):Observable<any> {
    return this.http.get(`${url}/${pageNum}`);
  }
}