import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Store } from 'src/app/Models/Store.model';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.scss']
})
export class StoresListComponent implements OnInit {
  searchText:string;
  pageNumber:number ; 
  stores:Array<Store>; 
  disableNext : boolean ; 
  constructor(
    private storesservice:StoresService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params =>
    {
     
      this.pageNumber=params['pageNumber'] ; 
      this.storesservice.getStores(this.pageNumber).subscribe(
        (response : Store[]) =>
        {
          this.stores=response;
          this.disableNext = this.stores.length != 10 ? true : false ;
          console.log(this.stores); 
        },
        error => 
        {
          this.router.navigate(["/404"]);  
        }  
        ,
      )
    })
  }
  nextPage()
  {
    this.pageNumber++;
    this.router.navigate(['/stores',this.pageNumber]) ; 
  }
  previousPage()
  {
    if (this.pageNumber>1)
    {
      this.pageNumber--;
    }
    this.router.navigate(['/stores', this.pageNumber] );  
  }



}
