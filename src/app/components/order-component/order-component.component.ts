import { Component, Input, OnInit } from '@angular/core';
import { OrderOwner } from 'src/app/Models/order.model';
import { OrderService } from 'src/app/services/httpClients/order.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-order-component',
  templateUrl: './order-component.component.html',
  styleUrls: ['./order-component.component.scss']
})
export class OrderComponentComponent implements OnInit {
 @Input() order : OrderOwner ; 
 public URL : String = "http://127.0.0.1:3000/" ;  
 public SRC : string ;
 public status : string ;  
  constructor(private http :OrderService) { }

  ngOnInit(): void {
    console.log(this.order); 
     this.SRC = `${this.URL}${this.order['product']['imgPath']}`; 
     this.order['accepted'] == false ? this.status = "Pending" : this.status = "Accepted" ; 
  }
  public acceptOrder()
  {  
    swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.acceptOrder(this.order['_id']).subscribe(
          () => swal.fire('' , 'Order Accepted.' , 'success'),
           err => {
             let msg : string ;
             switch ( err.status )
               {
                   
                   case 400 : case 401 : msg = err.error.error && err.error.error.message || 'Invalid input .';break
                   default : 
                           msg = 'Something went wrong .';
               } 
               swal.fire('' , msg , 'error');
          }
        );
      }
    })
  }

  
  public denyOrder()
  {  
    swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.denyOrder(this.order['_id']).subscribe(
          () => swal.fire('' , 'Order Denied.' , 'success'),
           err => {
             let msg : string ;
             switch ( err.status )
               {
                   
                   case 400 : case 401 : msg = err.error.error && err.error.error.message || 'Invalid input .';break
                   default : 
                           msg = 'Something went wrong .';
               } 
               swal.fire('' , msg , 'error');
          }
        );
      }
    })


  

  }

}
