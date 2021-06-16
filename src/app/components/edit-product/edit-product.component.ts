import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/httpClients/product.service';
import { imageValidator } from 'src/app/validators/image-validator';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { productType } from 'src/app/Models/product.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  public URL : String = "http://127.0.0.1:3000/" ;  
  public SRC : string ; 
  public image : File ;
  public selectedItem : productType  = { _id : "" ,  unitPrice : 0, quantity :  0 , orders : [] ,  label : "",  keywords : [] ,  detail : "" , createdAt : "" , categories: []  , unit: "" }  ; 
  private ALPHA_NUM_PATTERN : RegExp = /^[a-z\d\-_\s]+$/i  ; 
  public  idProducts :  productType[] = [];  
  public editForm : FormGroup ; 
  constructor(private http : ProductService , private fb : FormBuilder) { }

  ngOnInit(): void {
  
    for ( let i = 0 ; i < 30 ; i ++   )
    {  
       this.http.fetchProduct(i).subscribe(
        ( data : Array<productType> ) => 
        { 
           if ( data[0] )
           {
            data.forEach(element => 
               {
                  this.idProducts.push(element) ; 
               });
           } 
           
        } ,(err) => 
        { 
          swal.fire('' , 'An Error occured' , "error") ;  
        });  
        
    } 
    this.editForm = this.fb.group(
      {
         products : new FormControl('none',[Validators.required]) ,  
         label : new FormControl('',[Validators.pattern(this.ALPHA_NUM_PATTERN), Validators.maxLength(20),Validators.minLength(5)]) ,
         unitPrice :  new FormControl('',[ Validators.min(1),Validators.max(50000)]),
         quantity : new FormControl('',[  Validators.min(0) , Validators.max(9999)]) ,
         img : new FormControl('',[]) , 
         detail: new FormControl('',[Validators.maxLength(20),Validators.minLength(10)]),
      }
    ) ; 
    
   }

  get products() 
  {
     return this.editForm.get('products');
  } 
  get label() {
    return this.editForm.get('label');
  }

  get unitPrice() {
    return this.editForm.get('unitPrice');
  }

  get quantity() {
    return this.editForm.get('quantity');
  }

  get img() {
    return this.editForm.get('img');
  }
  get detail() 
  {
     return this.editForm.get('detail') ; 
  }
  public onFileSelect(event) {
    this.image  = event.target.files[0];

    this.img.setValidators(imageValidator(this.image));
    this.img.updateValueAndValidity();

  }
  public onSubmit()
  {
     const product = this.editForm.value ; 
     product.img = this.image;
     swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(product) ; 
        this.http.update(product).subscribe(
          () => {
            swal.fire('' , 'Product updated successfully .' , 'success'); 
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


  public onProductChange (event )
  { 
     this.idProducts.forEach(element => 
      {
         if ( element['_id'] == event.target.value) 
         {
          this.selectedItem = element ;
          
        }  
      }) ; 
      this.SRC = `${this.URL}${this.selectedItem.imgPath}`  ; 
  }

  public deleteProduct() 
  {
    const product = this.editForm.value ;  
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
        this.http.deleteProduct(product).subscribe(
          () => {
            swal.fire('' , 'Product Deleted successfully .' , 'success'); 
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
