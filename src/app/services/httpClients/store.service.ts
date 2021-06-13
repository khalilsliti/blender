import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from 'src/app/Models/Store.model';
const BACKEND_URL = 'http://127.0.0.1:3000';
const API = {
  update: `${BACKEND_URL}/stores`,
  get: `${BACKEND_URL}/users`,
  add:`${BACKEND_URL}/stores`
};

const OPTIONS : any = {
   observe : 'response'
};
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  
  constructor(private http : HttpClient) { }


  public getStore = () =>
  {
    return this.http.get<Store>(API.get, OPTIONS);
  }
  public updateStore = (store : Store) => 
  {
    let formdata = new FormData() ; 
    for (let key in store ) 
    {
          if( store[key] instanceof Object && key !== 'img') 
              {
                for (let nestedKey in store[key]) {
                  if( store[key][nestedKey] )
                    { console.log(store[key][nestedKey]); 
                      formdata.append(`${key}.${nestedKey}` , store[key][nestedKey]);
                    }
                }
              }
          else if (store[key])
          { 
            formdata.append(`${key}` , store[key]);
          }
    } 
     return this.http.put(API.update, formdata , OPTIONS ) ; 
  }

   public deleteStore = () =>  
   {
      return this.http.delete(API.update,OPTIONS) ; 
   } 

   public addStore = (data: Store) =>   
   {
    let formData = new FormData();

    for( let key in data) {
      
      if ( data[key])
      {
        if( data[key] instanceof Object && key !== 'img') 
          {
            for (let nestedKey in data[key]) {
              if( data[key][nestedKey] )
                {
                  formData.append(`${key}.${nestedKey}` , data[key][nestedKey]);
                }
            }
          }else
          {
            formData.append(`${key}` , data[key]);
          }
      }
  }
  return this.http.post<Store>(API.add,formData , OPTIONS );
   }}