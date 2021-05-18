import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/httpClients/user.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent implements OnInit {

  public signInForm : FormGroup;

  constructor(private fb:FormBuilder , private http : UserService) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({

     username : new FormControl('',[Validators.required , Validators.maxLength(15)]) ,
      password : new FormControl('',[Validators.required , Validators.minLength(8) , Validators.maxLength(16)]) ,
     
    });
  }

  get username() {
    return this.signInForm.get('username');
  }

  get password() {
    return this.signInForm.get('password');
  }

  
  public onSubmit() {
   
    if ( this.signInForm.invalid )
      return alert('Please review your data .');

    const user : User = this.signInForm.value;


    this.http.login(user).subscribe(
      () => swal.fire('' , 'Logged in successfully  .' , 'success') , err => {

        let msg : string ;
        switch ( err.status )
          {
              
              case  400 : case 401 : msg = 'Please check your credentials .';break;
              case 403 : msg = 'You are already logged in .' ; break;
              
              default : 
                      msg = 'Something went wrong';
          } 
      
          swal.fire('' , msg , 'error');

      }    );

  }

}


