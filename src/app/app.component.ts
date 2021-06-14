import { Component , OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

 

  constructor(private auth : AuthService) {

  }

  public isAuth : boolean  ;

  ngOnInit() {
    this.auth.authChannel$.subscribe( val =>
      {
        this.isAuth = val[0] ;
      } 
    );
  }

}
