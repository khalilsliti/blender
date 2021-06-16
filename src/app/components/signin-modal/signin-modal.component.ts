import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signin-modal',
  templateUrl: './signin-modal.component.html',
  styleUrls: ['./signin-modal.component.scss']
})

export class SigninModalComponent implements OnInit {

  
  @Input()
  public modalId ;
  public loginSelected : boolean ;
  public title : String ;

  constructor(private authSerivce : AuthService) { }

  ngOnInit(): void {

    this.authSerivce.authChannel$.subscribe(isAuth => {
      if(isAuth)
        document.getElementById('closeBtn').click();
    });

    this.selectLogin();
  }

  selectRegister() {
    this.loginSelected = false;
    this.title = "Register";
  }

  selectLogin()
    {
      this.loginSelected = true;
      this.title = "Sign in";
    }

}

