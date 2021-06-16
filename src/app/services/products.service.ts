import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsListChannelService } from './products-list-channel.service';
const  url="http://127.0.0.1:3000/products"
@Injectable({
  providedIn: 'root'
})

export class ProductsService {
 
  constructor(private http:HttpClient , private productsListChannel : ProductsListChannelService) { }

  public getProducts(pageNum : Number):Observable<any> {
    this.productsListChannel.uploading(true);
    return this.http.get(`${url}/${pageNum}`);
  }
}