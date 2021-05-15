import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  URL: string =  "http://127.0.0.1:3000/" ; 
 @Input() object ; 
 unit : string ; 
 imgPath : string ;
 stockStatus : string ;   
  constructor() { }

  ngOnInit(): void { 
     this.imgPath = this.URL + this.object.imgPath ;
     this.stockStatus = +this.object.quantity > 0 ? "In Stock" : "Sold Out " ;  
  }

}
