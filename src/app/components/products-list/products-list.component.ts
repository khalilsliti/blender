import {pairwise} from 'rxjs/internal/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { productType } from 'src/app/Models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { Store } from 'src/app/Models/Store.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  storeId = null  ;
  store : Store ; 
  searchText:string; 
  pageNumber: number ; 
  products:Array<productType>
  disableNext : boolean  = false ;  
  constructor(private productsservice:ProductsService,
              private activatedRoute:ActivatedRoute,
              private router:Router)
    {
      const navigation = this.router.getCurrentNavigation();
      const state = navigation.extras.state as Store; 
      this.store = state ; 
       if ( state )
       {
      this.storeId = state._id  ;
    } 
    }
   
  ngOnInit(): void {
  
    this.activatedRoute.params.subscribe( params =>
    {    
      this.pageNumber=params['pageNumber'] ;  
      this.productsservice.getProducts(this.pageNumber).subscribe(
        (response : productType[]) =>
        {
          if( this.storeId )
          {
            this.products = response ; 
            this.products =  this.products.filter( product  => 
            {  
               return this.storeId == product.store._id ;  
            }) ; 
          }else 
          {
            this.products = response ; 
             
          }
          // this.disableNext = this.products.length < 12 ? true : false ; 
          console.log(response);
          
        },
        () =>
        {
          this.router.navigate(["/404"]) ; 
        }
      )
    });  
  }
 
  nextPage()
  {
    this.pageNumber++;
    if ( this.storeId ) 
    {
     const navigationExtras: NavigationExtras  = { state: this.store }; 
     this.router.navigate(["/products",this.pageNumber] ,  navigationExtras ) ;    
    }else 
    this.router.navigate(['products',this.pageNumber]);  
  }
  previousPage()
  {
    if (this.pageNumber >= 1)
    {
      this.pageNumber--;
    }
    if ( this.storeId ) 
    {
     const navigationExtras: NavigationExtras  = { state: this.store }; 
     this.router.navigate(["/products",this.pageNumber] ,  navigationExtras ) ;    
    }else 
    this.router.navigate(['products',this.pageNumber]); 
  }
}
