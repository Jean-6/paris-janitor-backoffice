import { Injectable } from '@angular/core';
import {LoginResponseDto} from "../_dto/loginResponseDto";
import {HttpClient} from "@angular/common/http";
import {ResetPasswordRequestDto} from "../_dto/resetPasswordRequestDto";

@Injectable({
  providedIn: 'root'
})
export class PasswordHandlerService {

  private apiUrlForgotPassword ="http://localhost:9090/api/password/forgot";
  private apiUrlResetPassword ="http://localhost:9090/api/password/reset";
  isLoading = false;

  constructor(private _httpClient: HttpClient) { }

  sendResetEmail(email: string){
    return this._httpClient.post<{authResponse : LoginResponseDto}>(`${this.apiUrlForgotPassword}`,
      {email},
      { withCredentials: true });
  }

  resetPassword(resetPasswordRequest: ResetPasswordRequestDto){
    return this._httpClient.post<{response : String}>(`${this.apiUrlResetPassword}`,
      resetPasswordRequest,
      { withCredentials: true });
  }
}
