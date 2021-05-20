import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



        return next.handle(request.clone({withCredentials : true })).pipe(catchError(err => {

            if (err.status === 401) {

                // auto logout when encountring any response with 401 http status code from the backend API .

                this.auth.deauthenticate();

                Swal.fire('' , 'You are not logged in .' , 'error');
            }
            throw err;
        
        }));
    }
}