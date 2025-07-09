import { Injectable } from '@angular/core';
import {LoginResponse} from "../_dto/loginResponse";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ResetPassRequest} from "../_dto/resetPassRequest";
import {catchError, map, Observable, throwError} from "rxjs";
import {ResponseWrapper} from "../_dto/responseWrapper";

@Injectable({
  providedIn: 'root'
})
export class PasswordHandlerService {

  private urlSendEmail_ ="http://localhost:9090/api/password/send-email";
  private urlResetPass_ ="http://localhost:9090/api/password/reset";
  isLoading = false;

  constructor(private _httpClient: HttpClient) { }

  sendResetEmail(email: string): Observable<string>{

    const params = new HttpParams().set('email',email);
    return this._httpClient.post<ResponseWrapper<string>>(`${this.urlSendEmail_}`,null,
      {
        params,
        headers: new HttpHeaders({
          'Content-Type':'application/json'
        })
      }).pipe(
        map(response => response.data),
      catchError(error => {
        console.error('Error when sending mail', error);
        return throwError(()=> new Error('Error when sending mail'));
      })
    );
  }

  resetPassword(resetPasswordRequest: ResetPassRequest): Observable<string>{
    return this._httpClient.post<ResponseWrapper<string>>(`${this.urlResetPass_}`,
      resetPasswordRequest,
      {
        headers: new HttpHeaders({
          'Content-Type' : 'application/json'
        })
      }).pipe(
        map(response => response.data),
      catchError(error => {
        console.error('Error when reset password', error);
        return throwError(()=> new Error('Error when reset password'));

      })
    );
  }
}
