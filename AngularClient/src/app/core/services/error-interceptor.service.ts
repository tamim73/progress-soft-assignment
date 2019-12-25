import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error

            switch (error.status) {

              case 400:
                this.alertService.showInfo(error.error || 'Bad request');
                break;

              case 403:
                this.alertService.showWarning(error.error || 'Access denied');
                break;

              case 404:
                this.alertService.showWarning(error.error || 'Not found');
                break;

              // unhandled
              default:
                this.alertService.showError(error.error || 'Oops! something went wrong');
                break;
            }

            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          return throwError(errorMessage);
        })
      );
  }

}
