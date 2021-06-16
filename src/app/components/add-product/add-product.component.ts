import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { FormBuilder , FormControl, FormGroup , Validators} from '@angular/forms';
import { passwordValidator } from 'src/app/validators/password-validator';
import { imageValidator } from 'src/app/validators/image-validator';
import swal from 'sweetalert2';
import { ProductService } from 'src/app/services/httpClients/product.service';
import { productType } from 'src/app/Models/product.model';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  public image : File ;
  private  APLHA_PATTERN :RegExp = /^[a-z]*$/i ;
  private ALPHA_NUM_PATTERN : RegExp = /^[a-z\d\-_\s]+$/i  ; 
  private  UNIT_PATTERN :RegExp = /(^piece$)|(^kg$)/;
  public addProductForm : FormGroup ;

  constructor(private fb:FormBuilder , private http : ProductService) { }

  ngOnInit(): void {
  

    this.addProductForm = this.fb.group({

      label : new FormControl('',[Validators.required , Validators.pattern(this.ALPHA_NUM_PATTERN), Validators.maxLength(20),Validators.minLength(5)]) ,
      unit : new FormControl('none',[Validators.required , Validators.pattern(this.UNIT_PATTERN) ]) ,
      unitPrice :  new FormControl('',[Validators.required , Validators.min(1),Validators.max(50000)]),
      quantity : new FormControl('',[Validators.required ,  Validators.min(0) , Validators.max(9999)]) ,
      img : new FormControl('',[]) , 
      detail: new FormControl('',[Validators.required, Validators.maxLength(20),Validators.minLength(10)]),
    });
  }

  get label() {
    return this.addProductForm.get('label');
  }

  get unitPrice() {
    return this.addProductForm.get('unitPrice');
  }
  get unit() {
    return this.addProductForm.get('unit');
  }
  get quantity() {
    return this.addProductForm.get('quantity');
  }

  get img() {
    return this.addProductForm.get('img');
  }
  get detail() 
  {
     return this.addProductForm.get('detail') ; 
  }


  public onFileSelect(event) {
    this.image  = event.target.files[0];

    this.img.setValidators(imageValidator(this.image));
    this.img.updateValueAndValidity();

  }

  public onSubmit() {
   
    if ( this.addProductForm.invalid )
      return alert('Please review your data .'); 
    const product : productType = this.addProductForm.value;
    product.img = this.image;
    swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.addProduct(product).subscribe(
          () => swal.fire('' , 'Product Added Successfully.' , 'success'),
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
