import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { productType } from 'src/app/Models/product.model';
import { Store } from 'src/app/Models/Store.model';

@Component({
  selector: 'app-product-infomation',
  templateUrl: './product-infomation.component.html',
  styleUrls: ['./product-infomation.component.scss']
})
export class ProductInfomationComponent implements OnInit {
  unitPrice : number ; 
  detail : string ; 
  label: string ; 
  store : Store ; 
  available : string ; 
  quantity : number ; 
  URL: string =  "http://127.0.0.1:3000/" ;  
  public product : productType ; 
  imgPath : string ; 
  constructor(private router : Router ) { 
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as productType;
    this.label = state.label; 
    this.detail = state.detail ; 
    this.store = state.store ; 
    this.unitPrice = state.unitPrice
    this.imgPath = state.imgPath ; 
    this.imgPath = this.URL + this.imgPath ;
    this.quantity = state.quantity ;  
    this.available = this.quantity > 0  ? "In Stock " : "Sold Out " ; 
  }

  ngOnInit(): void { 
  }

}
