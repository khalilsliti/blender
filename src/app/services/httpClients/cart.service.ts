import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, from, observable, of } from 'rxjs';
import { catchError, concatAll, map, mergeAll, tap } from 'rxjs/operators';
import { Cart } from 'src/app/Models/Cart';
import { Order } from 'src/app/Models/Order';
import Swal from 'sweetalert2';
import { CartChannelService } from '../cart-channel.service';



const BACKEND_URL = 'http://127.0.0.1:3000';
const API = {
  cart : `${BACKEND_URL}/carts` ,
  order : `${BACKEND_URL}/orders` ,

};

const OPTIONS : any = {
   observe : 'body'
};

@Injectable({
  providedIn: 'root'
})
export class CartService {



  constructor( private http : HttpClient , private cartChannelService : CartChannelService ) { }


  public shop = (orders : any[] ) => 
   

  this.http.post( API.cart , {} , OPTIONS ).subscribe(
 
      cart => {
        
        this.cartChannelService.uploading(true);
         from(orders).pipe(
          //tap (order => {console.log(order)}) ,
         map ( order =>  this.http.post(API.order , new Order(cart['_id'] , order._id , order.orderQuantity)  , OPTIONS)   ) ,

         concatAll()

        ).subscribe( ()=> {} , err  => {
          this.removeCart(cart['_id']).subscribe();
          this.cartChannelService.uploading(false);
          Swal.fire('' , 'Something went wrong .' , 'error');
        } 
      ,
      ()=> {
        
        Swal.fire('' , 'Your cart has been ordered successfully .' , 'success');
        this.cartChannelService.uploading(false);
        this.cartChannelService.push(null);

       } ) ;
   

       })

   

    public removeCart = (cartId : String) => this.http.delete(`${API.cart}/${cartId}`, OPTIONS ); 
    
     
 

  
 
    }


  


