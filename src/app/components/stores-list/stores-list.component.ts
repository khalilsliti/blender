import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Store } from 'src/app/Models/Store.model';
import { StoresListChannelService } from 'src/app/services/stores-list-channel.service';
import { StoresService } from 'src/app/services/stores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.scss']
})
export class StoresListComponent implements OnInit {
  searchText:string;
  pageNumber:number ; 
  stores:Array<Store>; 
  disableNext : boolean = true ; 
  disablePrevious : boolean = true ; 
  pageSize : number = 12;
  isUploading : boolean ;

  constructor(
    private storesservice:StoresService,
    private activatedRoute:ActivatedRoute,
    private router:Router ,
    private storesListChannel : StoresListChannelService) { 
    }

  ngOnInit(): void {

   this.storesListChannel.uploadingChannel$.subscribe(val => {
      this.isUploading = val;
    });
  
    

    this.activatedRoute.params.subscribe( params =>
    {
     
      this.pageNumber=params['pageNumber'] ; 

      this.pageNumber= Math.max( 0 , Math.min(  Number(params['pageNumber']) , Number.MAX_SAFE_INTEGER ) ) ;

      if( isNaN( this.pageNumber ) )
      {
        this.router.navigate(['stores']);
      }
      else
      {
        this.storesservice.getStores(this.pageNumber).subscribe(
          (response : Store[]) =>
          {
            this.stores=response;

            if( ! this.stores.length && this.pageNumber > 0)
              this.router.navigate(['stores'])
        


            this.disableNext = this.stores.length < this.pageSize ? true : false ;
            this.disablePrevious = this.pageNumber == 0;
          },
          error => 
          {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            });
            
            this.router.navigate(["/"]) ; 
            this.storesListChannel.uploading(false);
          }  
          ,
          () => {
            this.storesListChannel.uploading(false);
          }
        )
      }
    })
  }
  nextPage()
  {
    this.pageNumber++;
    this.router.navigate(['stores',this.pageNumber]) ; 
  }
  previousPage()
  {
    if (this.pageNumber>1)
    {
      this.pageNumber--;
    }
    this.router.navigate(['stores', this.pageNumber] );  
  }



}
