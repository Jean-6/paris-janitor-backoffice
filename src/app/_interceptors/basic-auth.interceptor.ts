import {inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  private router = inject(Router);
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // API basic auth credentials
    const username='dev';
    const password='4b50dcc5-b6c9-49a9-af2c-8d7d8a416e3b';
    // Cloner en Base64
    const authToken = 'Basic ' + btoa(`${username}:${password}`);
    // Cloner la requete
    const authReq = request.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` },
    })
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status == 401 || error.status == 403){
          this.router.navigate(['/login']);
        }
        return throwError(error);

      })
    );
  }
}
