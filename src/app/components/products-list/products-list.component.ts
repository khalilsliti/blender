import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { productType } from 'src/app/Models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  pageNumber: number ; 
  products:Array<productType>
  disableNext : boolean ; 
  constructor(private productsservice:ProductsService,
              private activatedRoute:ActivatedRoute,
              private router:Router
    
    ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params =>
    {    
      this.pageNumber=params['pageNumber']
      this.productsservice.getProducts(this.pageNumber).subscribe(
        (response : productType[]) =>
        {
          this.products=response ; 
          this.disableNext = this.products.length != 10 ? true : false ; 
          console.log(response) ; 
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
    this.router.navigate(['products',this.pageNumber]);
  }
  previousPage()
  {
    if (this.pageNumber>=1)
    {
      this.pageNumber--;
    }
    this.router.navigate(['products',this.pageNumber]); 
  }
}
