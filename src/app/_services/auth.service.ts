import {Injectable/*, signal, Signal*/} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {User} from "../_models/User";
import {LoginResponseDto} from "../_dto/loginResponseDto";
import {Router} from "@angular/router";
import {RegisterRequestDto} from "../_dto/registerRequestDto";
import {LoginRequestDto} from "../_dto/loginRequestDto";

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private login_ = "/auth/login";
  private apiUrlRegister ="/auth/register";
  private logout_ ="/auth/logout";
  private apiUrlRefreshToken ="/auth/refresh-token";
  isLoading = false;


  private _currentUser = new BehaviorSubject<User | null>(null); //To stock user connected state
  currentUser = this._currentUser.asObservable();
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private _httpClient: HttpClient, private router: Router) {}

  getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  setIsAuthenticated(value: boolean): void {
    this.isAuthenticated.next(value);
  }


  login(loginRequest: LoginRequestDto): Observable<{loginResponse: LoginResponseDto}> {
    console.log(`${environment.apiUrl}${this.login_}`)
    return this._httpClient.post<{loginResponse : LoginResponseDto}>(`${environment.apiUrl}${this.login_}`,
      loginRequest,
      { withCredentials: true })
      .pipe(
        tap((response:any) => {
          localStorage.setItem('token', response.accessToken);
        })
      );
  }

  register(registerRequest: RegisterRequestDto){
    return this._httpClient.post<{authResponse : LoginResponseDto}>(`${this.apiUrlRegister}`,
      registerRequest ,
      { withCredentials: true });
  }


  refreshToken(): Observable<any>{
    return  this._httpClient.post<any>(`${this.apiUrlRefreshToken}`, {} , {withCredentials: true})
      .pipe(
        tap(res => {
          console.log('Tokens refreshed successfully');
        })
      );
  }

  isLoggIn(): boolean{
    const token = localStorage.getItem("token");
    return token != null;
  }

  logout(): Observable<any>{
    return this._httpClient.post<any>(`${environment.apiUrl}${this.logout_}` , {} ,{withCredentials: true})
      .pipe(
        tap(() => {
          //localStorage.removeItem("token")
          this._currentUser.next(null);
          //this.router.navigate(['/login'])
        })
      )
  }

}

