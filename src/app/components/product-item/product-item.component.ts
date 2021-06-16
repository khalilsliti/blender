import { Component, OnInit , Input} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { productType } from 'src/app/Models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  URL: string =  "http://127.0.0.1:3000/" ; 
 @Input() product : productType  ; 
 imgPath : string ;
 stockStatus : boolean ;   
  constructor(private route:Router, 
              private activateRoute : ActivatedRoute )
               {}

  ngOnInit(): void { 
     this.imgPath = this.URL + this.product.imgPath ;
     this.stockStatus = this.product.quantity > 0  ;  
  }
  viewItem() 
  {
    const navigationExtras: NavigationExtras  = {state: this.product }; 
     this.route.navigate(["/product-information"] ,  navigationExtras ) ; 
  }
}
