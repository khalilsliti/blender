import {pairwise, tap} from 'rxjs/internal/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { productType } from 'src/app/Models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { Store } from 'src/app/Models/Store.model';
import Swal from 'sweetalert2';
import { ProductsListChannelService } from 'src/app/services/products-list-channel.service';

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
  disableNext : boolean = true ; 
  disablePrevious : boolean = true ; 
  pageSize : number = 12;

  isUploading : boolean ;

  constructor(private productsservice:ProductsService,
              private activatedRoute:ActivatedRoute,
              private router:Router ,
              private prouctsListChannel : ProductsListChannelService)
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

    this.prouctsListChannel.uploadingChannel$.subscribe(val => {
      this.isUploading = val;
    });
  

    this.activatedRoute.params.subscribe( params =>
    {
      
      
      this.pageNumber= Math.max( 0 , Math.min(  Number(params['pageNumber']) , Number.MAX_SAFE_INTEGER ) ) ;

      if( isNaN( this.pageNumber ) )
      {
        this.router.navigate(['products']);
      }
      else
      {
        
        this.productsservice.getProducts(this.pageNumber).subscribe(
          (response : productType[]) =>
          { 
     
            this.products = response ; 
            
            if( ! this.products.length && this.pageNumber > 0)
              this.router.navigate(['products']);
            
            if( this.storeId )
            {

              this.products =  this.products.filter( product  => this.storeId == product.store._id ) ; 

            }

            this.disableNext = this.products.length < this.pageSize ? true : false ;
            this.disablePrevious = this.pageNumber == 0; 
          
            
          },
          () =>
          {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
           
            this.router.navigate(["/"]) ; 
            this.prouctsListChannel.uploading(false);
          } ,
          () => {
            this.prouctsListChannel.uploading(false);
          }
        )
      }

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
