import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoresListChannelService } from './stores-list-channel.service';
const  url="http://127.0.0.1:3000/stores"
@Injectable(
    {
  providedIn: 'root'
    })

export class StoresService 
{

  constructor(private http:HttpClient , private storesListChannel : StoresListChannelService) {}


   public getStores(pageNum : Number) : Observable<any> 
   {
    this.storesListChannel.uploading(true);
    return this.http.get(`${url}/${pageNum}`);
   }
  
}
