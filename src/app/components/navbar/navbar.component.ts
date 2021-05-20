import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/httpClients/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor( private http : UserService ) { }

  ngOnInit(): void {
  }

  onLogout() {

    this.http.logout().subscribe(
      () => Swal.fire('' , 'Logged out successfully  .' , 'success') , err => {

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
