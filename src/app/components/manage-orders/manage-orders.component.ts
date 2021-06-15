import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/httpClients/order.service';
import { Order } from 'src/app/Models/order.model';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit {
   public pageNumber : number ; 
   public orders : Order[] ; 
   public notEnough : boolean ; 
   public spinner : boolean; 
  constructor( private activatedRoute:ActivatedRoute,private http : OrderService , private router : Router ) { }

  ngOnInit(): void {
   this.activatedRoute.params.subscribe( params => 
    { 
         this.pageNumber = params['pageNumber'] ;  
       this.http.getOrders(this.pageNumber).subscribe ( (response : Order[]) =>
      {
           this.orders = response ;  
           if (this.orders.length == 0 ) 
            {
            this.notEnough = true ;
            setTimeout(() => {
              this.spinner = true ; 
            } , 1000 );
            }  
            else
            {
              this.notEnough = false ;
              this.spinner = false ; 
            }  
      }
       ); 

     }

   );  
     
  }
  nextPage()
  {
    this.pageNumber++;
     this.router.navigate(["/owner-dashboard/manage-orders/",this.pageNumber] ); 
  }
  previousPage()
  {
    if (this.pageNumber >= 1)
    {
      this.pageNumber--;
      this.router.navigate(["/owner-dashboard/manage-orders/",this.pageNumber] ) ;
    }
         
  }

}
