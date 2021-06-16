import { Component, Input, OnInit } from '@angular/core';
import { OrderOwner } from 'src/app/Models/order.model';
import { User } from 'src/app/models/User';
import { OrderService } from 'src/app/services/httpClients/order.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-order-component',
  templateUrl: './order-component.component.html',
  styleUrls: ['./order-component.component.scss']
})
export class OrderComponentComponent implements OnInit {
 @Input() order : OrderOwner ; 
 public customer = User ; 
 public URL : String = "http://127.0.0.1:3000/" ;
 public link : String ;  
 public SRC : string ;
 public status : string ;  
  constructor(private http :OrderService) { }

  ngOnInit(): void {
    this.customer = this.order['cart']['customer'] ;
    this.link = this.URL + this.customer['imgPath'] ; 
    console.log(this.customer) ;  
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
  public viewCustomerInfo()
  {
   swal.fire({
      title: 'Customer Information',
      html : ` 
      <div class="container" >
      <div class="row">
      <div class="ml-1 col-6" >
          <img height="120" width="120" src=${this.link}
          onerror="this.src='../../../assets/imgs/not-found/no-product.png';"
          >
      </div>
       <div class="col">
          <p><span class="font-weight-bold" style="color:#007bff;text-align:left">Full Name : </span>${this.customer['firstName']} ${this.customer['lastName']} </p>
          <p>
             <span class="font-weight-bold" style="color:#007bff;text-align:left"> Phone Number: </span>${this.customer['phone']}
          </p>
          <p>
          <span class="font-weight-bold" style="color:#007bff;text-align:left"> Address : </span>Street  ${this.customer['address']['street']} ${this.customer['address']['city']} ${this.customer['address']['governorate']} ${this.customer['address']['postalCode']}
          </p>
       </div>
    
    </div>
  </div>` ,
      confirmButtonText: 'Close'
    })
  }

  

}
