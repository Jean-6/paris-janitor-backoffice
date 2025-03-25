import { Injectable } from '@angular/core';
import {AuthResponse} from "../_dto/authResponse";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PasswordHandlerService {

  private apiUrlForgotPassword ="http://localhost:9090/api/password/forgot";
  private apiUrlResetPassword ="http://localhost:9090/api/password/reset";

  constructor(private _httpClient: HttpClient) { }

  sendResetEmail(email: string){
    return this._httpClient.post<{authResponse : AuthResponse}>(`${this.apiUrlForgotPassword}`,
      {email},
      { withCredentials: true });
  }

  resetPassword(token: string, newPassword: string){
    return this._httpClient.post<{response : String}>(`${this.apiUrlResetPassword}`,
      {token,newPassword},
      { withCredentials: true });
  }
}
