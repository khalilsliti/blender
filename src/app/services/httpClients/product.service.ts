import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productType } from 'src/app/Models/product.model';


const BACKEND_URL = 'http://127.0.0.1:3000';
const API = {
  addProduct : `${BACKEND_URL}/products` , 
};
const OPTIONS : any = {
  observe : 'response'
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  public addProduct = (data: productType) =>   
  {
    let formdata = new FormData() ; 
    for (let key in data ) 
    {
       if (data[key])
       {
          formdata.append(key,data[key]) ; 
       }
    }
    console.log(formdata) ; 
     return this.http.post(API.addProduct, formdata , OPTIONS ) ; 
  }
}
