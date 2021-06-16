import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { productType } from 'src/app/Models/product.model';
import { Store } from 'src/app/Models/Store.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartChannelService } from 'src/app/services/cart-channel.service';

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
  available : boolean ; 
  quantity : number ; 
  URL: string =  "http://127.0.0.1:3000/" ;  
  public product ; 
  imgPath : string ; 
  public isAuth : boolean ;
  public role : String ; 

  constructor(private router : Router , private cartChannel : CartChannelService , private auth : AuthService ) { 
     
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as productType;

    if( !state )
      this.router.navigate(['/products']);
    this.label = state.label; 
    this.detail = state.detail ; 
    this.store = state.store ; 
    this.unitPrice = state.unitPrice
    this.imgPath = state.imgPath ; 
    this.imgPath = this.URL + this.imgPath ;
    this.quantity = state.quantity ;  
    this.available = this.quantity > 0 ; 
    this.product = Object.assign({},state);
    this.product.imgPath = this.imgPath;
    this.product.orderQuantity = 1;
    
  }

  ngOnInit(): void {
    this.auth.authChannel$.subscribe( val =>
      { 
       this.isAuth = val[0]; 
       this.role = val[1] ;
       } 
     );
  }

  public addToCart(){
    this.cartChannel.push( Object.assign({},this.product) );
  }

}
