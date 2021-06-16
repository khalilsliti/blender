import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from 'src/app/Models/store.model';
import { StoreService } from 'src/app/services/httpClients/store.service';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.scss']
})
export class OwnerDashboardComponent implements OnInit {
  public activeTab : number ; 
  public store:Store ; 
  public link : String = 'edit-product'; 
  constructor(private http : StoreService, private router : Router,private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.http.getStore().subscribe((response : HttpResponse<Store>)=>
    {
      this.store = response.body[0]['store'] ; 
      });
   }
  
  public selectedTab(event : any )  
  {
    switch(event.target.name) 
    {
       case "create" : this.activeTab = 1 ;   break ; 
       case "editStore" : this.activeTab = 2 ; break ; 
       case "addProduct" : this.activeTab = 3 ; break ; 
       case "editProduct" : this.activeTab = 4 ; break ; 
       case "order" : this.activeTab = 5 ; 
    }
  }

}
