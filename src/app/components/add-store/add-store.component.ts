import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormControl, FormGroup , Validators} from '@angular/forms';
import { Store } from 'src/app/Models/Store.model';
import { StoreService } from 'src/app/services/httpClients/store.service';
import { governorateValidator } from 'src/app/validators/governorate-validator';
import { imageValidator } from 'src/app/validators/image-validator';
import swal from 'sweetalert2';
@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss']
})
export class AddStoreComponent implements OnInit {
  public image : File ;
  private  ALPHA_PATTERN :RegExp = /^[a-z]*$/i ;
  private ALPHA_NUM_PATTERN : RegExp = /^[a-z\d\-_\s]+$/i  ; 
  public addStoreForm : FormGroup ;


  constructor(private fb:FormBuilder,private http :StoreService) { }

  ngOnInit(): void {
    
    this.addStoreForm = this.fb.group({

      name : new FormControl('',[Validators.required,Validators.pattern(this.ALPHA_NUM_PATTERN), Validators.maxLength(20),Validators.minLength(4)]) ,
         address :  this.fb.group(
          {
            governorate : new FormControl('',[Validators.required,governorateValidator]) ,
            municipality :  new FormControl('',[Validators.required,Validators.pattern(this.ALPHA_PATTERN) ]) ,
            city :  new FormControl('',[Validators.required,Validators.pattern(this.ALPHA_PATTERN) ]) ,
            street :  new FormControl('',[Validators.required,Validators.pattern(this.ALPHA_PATTERN) ]) ,
            postalCode :  new FormControl('',[Validators.required, Validators.min(1000) , Validators.max(9999)]) ,
          }) ,
         img : new FormControl('',[]) 
    });
  }
  get name() {
    return this.addStoreForm.get('name');
  }
  get img() {
    return this.addStoreForm.get('img');
  }
  get address() 
  {
     return this.addStoreForm.get('address') ; 
  }
 


  public onFileSelect(event) {
    this.image  = event.target.files[0];

    this.img.setValidators(imageValidator(this.image));
    this.img.updateValueAndValidity();

  }

  public onSubmit() {
   
    if ( this.addStoreForm.invalid )
      return alert('Please review your data .'); 
    const store : Store = this.addStoreForm.value;
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
        this.http.addStore(store).subscribe(
          () => swal.fire('' , 'Store Added Successfully.' , 'success'),
           err => {
             let msg : string ;
             switch ( err.status )
               {
                   
                   case 400 : case 401 : msg = err.error.error && err.error.error.message || 'Invalid input .';break
                   default : 
                           msg = 'Something went wrong .';
               } 
           
               swal.fire('' , msg , 'error');
          }
        );
      }
    })


  

  }
}



