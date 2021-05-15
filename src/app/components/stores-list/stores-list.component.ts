import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from 'src/app/Models/Store.model';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.scss']
})
export class StoresListComponent implements OnInit {
  pageNumber:number=1
  stores:Array<Store>
  constructor(
    private storesservice:StoresService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>
    {
      if (params['pageNumber'])
      {this.pageNumber=params['pageNumber']}
      
      this.storesservice.getStores(this.pageNumber).subscribe(
        (response)=>{this.stores=response;console.log(this.stores)},
        (error)=>{console.log(error)},
      )
    })
  }
  nextPage()
  {
    this.pageNumber++;
    const link=['stores',this.pageNumber]
    this.router.navigate(link)
  }
  previousPage()
  {
    if (this.pageNumber>1)
    {
      this.pageNumber--;
    }
    const link=['stores',this.pageNumber]
    this.router.navigate(link)
  }

}
