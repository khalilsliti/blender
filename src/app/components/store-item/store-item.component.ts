import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Store } from 'src/app/Models/Store.model';

@Component({
  selector: 'app-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.scss']
})
export class StoreItemComponent implements OnInit {
 @Input() store : Store ;   
 URL: string =  "http://127.0.0.1:3000/" ; 
 imgPath : string ;   
  constructor(private router:Router) { }

  ngOnInit(): void { 
     this.imgPath = this.URL + this.store.imgPath ;
  }

  viewProducts() 
  {
    const navigationExtras: NavigationExtras  = { state: this.store }; 
     this.router.navigate(["/products"] ,  navigationExtras ) ; 
    
  }
  

}
