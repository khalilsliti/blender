import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/httpClients/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isAuth : boolean ;
  public role : String ; 
  public dashboard : string ;

  constructor( private http : UserService , private auth : AuthService ) { }

 
 

  ngOnInit() {
    this.auth.authChannel$.subscribe( val =>
       { 
        this.isAuth = val[0]; 
        this.role = val[1] ;
        if (this.role == "owner") 
         {
            this.dashboard = "/owner-dashboard" 
         } else if (this.role == "customer")
         {
            this.dashboard = "/customer-dashboard" ; 
         }

        } 
      );
  }


  onLogout() {

    this.http.logout().subscribe(
      () => {
        
        this.auth.deauthenticate();
        
        Swal.fire('' , 'Logged out successfully  .' , 'success') 
        
      }

      , err => {

        let msg : string ;
        switch ( err.status )
          {
              
              case 401 : msg = 'You are not logged in .';break;
              default : 
                      msg = 'Something went wrong .';
          } 
      
          Swal.fire('' , msg , 'error');

      }    );

  }

}
