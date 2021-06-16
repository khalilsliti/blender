import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { imageValidator } from 'src/app/validators/image-validator';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/services/httpClients/store.service';
import { Store } from 'src/app/Models/Store.model';
import { HttpResponse } from '@angular/common/http';
import { governorateValidatorUpdate } from 'src/app/validators/governorate-validator-update';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.scss']
})
export class EditStoreComponent implements OnInit {

  public URL : String = "http://127.0.0.1:3000/" ;  
  public SRC : string ; 
  public image : File ;
  public store : Store ; 
  public ALPHA_PATTERN : RegExp = /^[a-z]*$/i ;  
  public ALPHA_NUM_PATTERN : RegExp =  /^[a-z\d\-_\s]+$/i ;   
  public editStoreForm : FormGroup ; 
  constructor(private http : StoreService , private fb : FormBuilder) { 
   
  }

  ngOnInit(): void {
    this.http.getStore().subscribe((response : HttpResponse<Store>)=>
    {
      this.store = response.body[0]['store'] ; 
      this.SRC = `${this.URL}${this.store.imgPath}`  ;
      });
    this.editStoreForm = this.fb.group(
      {
         name : new FormControl('',[Validators.pattern(this.ALPHA_NUM_PATTERN), Validators.maxLength(20),Validators.minLength(5)]) ,
         address :  this.fb.group(
          {
            governorate : new FormControl('',[governorateValidatorUpdate ]) ,
            municipality :  new FormControl('',[Validators.pattern(this.ALPHA_PATTERN) ]) ,
            city :  new FormControl('',[Validators.pattern(this.ALPHA_PATTERN) ]) ,
            street :  new FormControl('',[Validators.pattern(this.ALPHA_PATTERN) ]) ,
            postalCode :  new FormControl('',[Validators.min(1000) , Validators.max(9999)]) ,
          }) ,
         img : new FormControl('',[]) 
      }
    ) ; 
    
   }

  get name() {
    return this.editStoreForm.get('name');
  }

  get img() {
    return this.editStoreForm.get('img');
  }
  get address()
  {
    return this.editStoreForm.get('address'); 
  }

  public onFileSelect(event) {
    this.image  = event.target.files[0];
    this.img.setValidators(imageValidator(this.image));
    this.img.updateValueAndValidity();

  }
  public onSubmit()
  {
    const store : Store = this.editStoreForm.value;
    store.img = this.image;

    swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.updateStore(store).subscribe(
          () => {
            swal.fire('' , 'Store updated successfully .' , 'success'); 
               },     
           err => {
             let msg : string ;
             switch ( err.status )
               {
                   case  400 : case 401 : case 500:   msg = err.error.error && err.error.error.message || 'Invalid input .';break;
                   default : 
                           msg = 'Something went wrong';
               } 
               swal.fire('' , msg , 'error');
          }
        );
      }
    })
     
  }

  public deleteStore() 
  {
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to Connect as User Again !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.deleteStore().subscribe(
          () => {
            swal.fire('' , 'Your Store Deleted successfully .' , 'success'); 
               },     
           err => {
             let msg : string ;
             switch ( err.status )
               {
                   case  400 : case 401 : msg = err.error.error && err.error.error.message || 'Invalid input .';break;
                   default : 
                           msg = 'Something went wrong';
               } 
               swal.fire('' , msg , 'error');
          }
        );
      }
    }) 
  }

}
