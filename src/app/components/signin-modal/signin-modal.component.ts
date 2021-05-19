import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
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

