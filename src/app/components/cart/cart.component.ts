import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { CartChannelService } from 'src/app/services/cart-channel.service';
import { CartService } from 'src/app/services/httpClients/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor( private cartChannelService : CartChannelService , private cartHttpService : CartService ) { }

  public orders = this.cartChannelService.cartOrders  ;
  public totalPrice : number  = this.cartChannelService.cartTotalPrice ;
  public isUploading : boolean = false;

  ngOnInit(): void {

   this.cartChannelService.uploadingChannel.subscribe(isUploading => {
     this.isUploading = isUploading;
   });

    this.cartChannelService.cartChannel.pipe(tap(newOrder => {if(! newOrder) this.resetCart();})).subscribe(
      
      newOrder => {
      if( newOrder)
      {  
        let doPush = true;
        
        newOrder.orderQuantity = Math.max(0 , Math.min( newOrder.quantity , newOrder.orderQuantity )) ;
        
        this.orders.map(order => {
          if(order._id === newOrder._id)
          {
            this.totalPrice -= order.orderQuantity * order.unitPrice ;
            order.orderQuantity = Math.min(order.quantity , order.orderQuantity + newOrder.orderQuantity) ;
          
            newOrder = order;

            doPush = false;
          }
            
          return order;
        })
        if( doPush && newOrder.orderQuantity > 0)
          this.orders.push(newOrder);
        
          this.totalPrice =  this.totalPrice + newOrder.unitPrice * newOrder.orderQuantity  ;

          this.updateSessionStorage();
      }
    } );
  }

  public removeOrder(index:number){
    this.totalPrice -= this.orders[index].unitPrice * this.orders[index].orderQuantity ;
    this.orders.splice(index,1);
    this.updateSessionStorage();
}

public resetCart(){
  this.orders = [];
  this.totalPrice = 0;
  this.updateSessionStorage();
}

public confirm(){

  Swal.fire({
    title: 'Are you sure?',
    text: "You are about to undo the orders .",
   
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes , undo '
  }).then((result) => {
    if (result.isConfirmed) {
        this.resetCart();
        }
      ;
    }
  )


}

public shop() {
  if( this.orders.length )
    this.cartHttpService.shop(this.orders);
}

public updateSessionStorage(){
  this.cartChannelService.cartOrders = this.orders;
  this.cartChannelService.cartTotalPrice = this.totalPrice;
}

}
