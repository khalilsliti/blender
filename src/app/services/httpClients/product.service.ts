import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productType } from 'src/app/Models/product.model';


const BACKEND_URL = 'http://127.0.0.1:3000';
const API = {
  addProduct : `${BACKEND_URL}/products` , 
  seeProduct : `${BACKEND_URL}/users/products` ,
  updateProduct:  `${BACKEND_URL}/products` , 
  deleteProduct : `${BACKEND_URL}/products` , 
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
     return this.http.post(API.addProduct, formdata , OPTIONS ) ; 
  }
  public fetchProduct = ( pageNumber : number )=>  
  {  
     return  this.http.get(API.seeProduct + "/" + pageNumber );
  
  }
  public update( product : productType ) 
  {
    let formdata = new FormData() ; 
    for (let key in product ) 
    {
       if (product[key] && key != "products" )
       {
         formdata.append(key,product[key]) ; 
       }
    } 
     return this.http.put(API.updateProduct + '/' + product['products'], formdata , OPTIONS ) ; 
  }

  public deleteProduct = ( product : productType ) => 
  {
     return this.http.delete(API.deleteProduct + '/' + product['products'] , OPTIONS); 
  }
}

