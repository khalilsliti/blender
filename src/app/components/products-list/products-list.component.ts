import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  pageNumber: number ; 
  products:Array<any>
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
        response =>
        {
          this.products=response ; 
          this.disableNext = this.products.length != 10 ? true : false ; 
    
        },
        error =>
        {
          console.log(error)
        }
      )
    });
    
  }
 
  nextPage()
  {
    this.pageNumber++;
    const link=['products',this.pageNumber]
    this.router.navigate(link);
  }
  previousPage()
  {
    if (this.pageNumber>=1)
    {
      this.pageNumber--;
    }
    const link=['products',this.pageNumber]
    this.router.navigate(link); 
  }
}
