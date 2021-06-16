import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from 'src/app/models/User';

const BACKEND_URL = 'http://127.0.0.1:3000';
const API = {
  login : `${BACKEND_URL}/users/login` ,
  logout : `${BACKEND_URL}/users/logout` ,
  register : `${BACKEND_URL}/users/register`
};

const OPTIONS : any = {
   observe : 'response'
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }



  public logout = () => {
    return this.http.post(API.logout,{},OPTIONS);
  }

  

  public login  = (data : User) => {

    return this.http.post<User>(API.login, data , OPTIONS );

  }

  
 



  public register = (data : User) => {

    let formData = new FormData();

    for( let key in data) {
      
      if ( data[key] && key !== 'repassword' )
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

  
    return this.http.post<User>(API.register,formData , OPTIONS );

  }
}
