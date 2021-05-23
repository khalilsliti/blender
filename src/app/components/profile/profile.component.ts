import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { FormBuilder , FormControl, FormGroup , Validators} from '@angular/forms';
import { passwordValidator } from 'src/app/validators/password-validator';
import { pgValidator } from 'src/app/validators/pg-validator';
import { governorateValidator } from 'src/app/validators/governorate-validator';
import { imageValidator } from 'src/app/validators/image-validator';
import { UserService } from 'src/app/services/httpClients/user.service';
import swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { governorateValidatorUpdate } from 'src/app/validators/governorate-validator-update';
import { passwordValidatorUpdate } from 'src/app/validators/password-validator-update';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public URL : String = "http://127.0.0.1:3000/" ;  
  public user:User
  public image : File ;
  private  APLHA_PATTERN :RegExp = /^[a-z]*$/i ;
  private  ROLE_PATTERN :RegExp = /(^owner$)|(^customer$)/;
  public registerForm : FormGroup ;
  birthdate:String ; 
  public SRC : String ; 

  constructor(private fb:FormBuilder , private http : UserService) { }

  ngOnInit(): void {
   this.http.getuser().subscribe((response:HttpResponse<User>)=>
    {
      this.user=response.body[0];
      this.SRC = `${this.URL}${this.user.imgPath}`  ;  
      });
    
    this.registerForm = this.fb.group({

      firstName : new FormControl('',[Validators.pattern(this.APLHA_PATTERN) ]) ,
      lastName :  new FormControl('',[Validators.pattern(this.APLHA_PATTERN) ]) ,
      email :  new FormControl('',[ Validators.email]) ,
      address :  this.fb.group(
        {
          governorate : new FormControl('',[governorateValidatorUpdate]) ,
          municipality :  new FormControl('',[Validators.pattern(this.APLHA_PATTERN) ]) ,
          city :  new FormControl('',[ Validators.pattern(this.APLHA_PATTERN) ]) ,
          street :  new FormControl('',[ Validators.pattern(this.APLHA_PATTERN) ]) ,
          postalCode :  new FormControl('',[ Validators.min(1000) , Validators.max(9999)]) ,
        }) ,
        
      username : new FormControl('',[ Validators.maxLength(15)]) ,
      password : new FormControl('',[ Validators.minLength(8) , Validators.maxLength(16)]) ,
      newPassword : new FormControl('',[ Validators.minLength(8) , Validators.maxLength(16)]) ,
      repassword : new FormControl('',[ Validators.minLength(8) , Validators.maxLength(16)]) ,
      birthDate : new FormControl('',[pgValidator]) ,
      role : new FormControl('',[ Validators.pattern(this.ROLE_PATTERN) ]) ,
      phone : new FormControl('',[  Validators.min(20000000) , Validators.max(99999999)]) ,
      img : new FormControl('',[])
    } , { validators : [passwordValidatorUpdate]});
    

  }

  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get address() {
    return this.registerForm.get('address');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get repassword() {
    return this.registerForm.get('repassword');
  }

  get birthDate() {
    return this.registerForm.get('birthDate');
  }

  get role() {
    return this.registerForm.get('role');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get img() {
    return this.registerForm.get('img');
  }
  get newPassword() 
  {
     return this.registerForm.get("newPassword"); 
  }


  public onFileSelect(event) {
    this.image  = event.target.files[0];

    this.img.setValidators(imageValidator(this.image));
    this.img.updateValueAndValidity();

  }
  public delete() 
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
        this.http.deleteAccount().subscribe(
          () => {
            swal.fire('' , 'User Deleted successfully .' , 'success'); 
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


  public update() {
    const user : User = this.registerForm.value;
    user.img = this.image;

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
        this.http.update(user).subscribe(
          () => {
            swal.fire('' , 'User updated successfully .' , 'success'); 
               },     
           err => {
             let msg : string ;
             switch ( err.status )
               {
                   case  400 : case 401 : case 500:   msg = err.error.error && err.error.error.message || 'Invalid input .';break;
                   case 406 : msg = "You don't have updated Values "; break; 
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

