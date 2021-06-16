import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoresListChannelService {

 
  private _uploadingChannel$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
 


  constructor() { }
  public uploading(isUploading){
  
    
    this._uploadingChannel$.next(isUploading);
  }
    
  public get uploadingChannel$() {
    return this._uploadingChannel$;
  }
  
}
