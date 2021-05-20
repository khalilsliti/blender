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


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user:User
  public image : File ;
  private  APLHA_PATTERN :RegExp = /^[a-z]*$/i ;
  private  ROLE_PATTERN :RegExp = /(^owner$)|(^customer$)/;
  public registerForm : FormGroup ;
  birthdate:String
  src:String

  constructor(private fb:FormBuilder , private http : UserService) { }

  ngOnInit(): void {
   this.http.getuser().subscribe((response:HttpResponse<User>)=>
    {
      this.user=response.body[0];
      
     this.birthdate=this.user.birthDate.toString().substr(0, 10)
      },
      (error)=>
      {console.log(error)}
    
    );
    
    this.registerForm = this.fb.group({

      firstName : new FormControl('',[Validators.required , Validators.pattern(this.APLHA_PATTERN) ]) ,
      lastName :  new FormControl('',[Validators.required , Validators.pattern(this.APLHA_PATTERN) ]) ,
      email :  new FormControl('',[Validators.required , Validators.email]) ,
      address :  this.fb.group(
        {
          governorate : new FormControl('',[Validators.required , governorateValidator ]) ,
          municipality :  new FormControl('',[Validators.required ,Validators.pattern(this.APLHA_PATTERN) ]) ,
          city :  new FormControl('',[Validators.required , Validators.pattern(this.APLHA_PATTERN) ]) ,
          street :  new FormControl('',[Validators.required , Validators.pattern(this.APLHA_PATTERN) ]) ,
          postalCode :  new FormControl('',[Validators.required , Validators.min(1000) , Validators.max(9999)]) ,
        }) ,
        
      username : new FormControl('',[Validators.required , Validators.maxLength(15)]) ,
      password : new FormControl('',[Validators.required , Validators.minLength(8) , Validators.maxLength(16)]) ,
      repassword : new FormControl('',[Validators.required , Validators.minLength(8) , Validators.maxLength(16)]) ,
      birthDate : new FormControl('',[Validators.required , pgValidator]) ,
      role : new FormControl('none',[Validators.required , Validators.pattern(this.ROLE_PATTERN) ]) ,
      phone : new FormControl('',[Validators.required ,  Validators.min(20000000) , Validators.max(99999999)]) ,
      img : new FormControl('',[])
    } , { validators : [passwordValidator]});
    

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


  public onFileSelect(event) {
    this.image  = event.target.files[0];

    this.img.setValidators(imageValidator(this.image));
    this.img.updateValueAndValidity();

  }

  public update() {
   
    if ( this.registerForm.invalid )
      return alert('Please review your data .');

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
          () => {swal.fire('' , 'User updated successfully .' , 'success'),
                  console.log(user)},     
           err => {
             
             let msg : string ;
             switch ( err.status )
               {
                   
                   case  400 : case 401 : msg = err.error.error && err.error.error.message || 'Invalid input .';break;
                   case 403 : msg = 'You are already logged in .' ; break;
                   
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

