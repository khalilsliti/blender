import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.scss']
})
export class OwnerDashboardComponent implements OnInit {
  public activeTab : number ; 
  constructor() { }

  ngOnInit(): void {
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
