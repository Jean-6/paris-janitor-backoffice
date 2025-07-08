import {Injectable/*, signal, Signal*/} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, tap, throwError} from "rxjs";
import {User} from "../_models/User";
import {RegisterRequest} from "../_dto/registerRequest";

import {environment} from "../../environments/environment";
import {LoginRequest} from "../_dto/loginRequest";
import {LoginResponse} from "../_dto/loginResponse";
import {ResponseWrapper} from "../_dto/responseWrapper";
import {RegisterResponse} from "../_dto/registerResponse";


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private urlLogin_ = "/auth/login";
  private urlRegister_ = "/auth/register";
  private logout_ = "/auth/logout";
  private apiUrlRefreshToken = "/auth/refresh-token";
  isLoading = false;


  private _currentUser = new BehaviorSubject<User | null>(null); //To stock user connected state
  currentUser = this._currentUser.asObservable();
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private _httpClient: HttpClient) {
  }

  getAccessToken(): string | null {
    return localStorage.getItem("accessToken");

  }

  getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  }


  getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  setIsAuthenticated(value: boolean): void {
    this.isAuthenticated.next(value);
  }


  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this._httpClient.post<ResponseWrapper<LoginResponse>>(`${environment.apiUrl}${this.urlLogin_}`,
      loginRequest,
      {withCredentials: true}).pipe(
      tap((response: ResponseWrapper<LoginResponse>) => {
        if (response.data.accessToken != null) {
          localStorage.setItem('accessToken', response.data.accessToken);
        }
      }),
      map(response => response.data),
      catchError(error => {
        console.error("Error when login :", error);
        return throwError(()=> new Error('Error when login'));

      })
    );
  }

  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this._httpClient.post<ResponseWrapper<RegisterResponse>>(`${environment.apiUrl}${this.urlRegister_}`,
      registerRequest,
      {withCredentials: true}).pipe(
      tap((response: ResponseWrapper<RegisterResponse>) => {
        if(response.data.accessToken!=null){
          localStorage.setItem('accessToken',response.data.accessToken);
        }
      }),
      map(response => response.data),
      catchError(error =>{
        console.error("Error when registration", error);
        return throwError(()=> new Error('Error when registration'));
      })
    );
  }


  refreshToken(): Observable<any> {
    return this._httpClient.post<any>(`${this.apiUrlRefreshToken}`, {}, {withCredentials: true})
      .pipe(
        tap(res => {
          console.log('Tokens refreshed successfully');
        })
      );
  }

  isLoggIn(): boolean {
    const token = localStorage.getItem("token");
    return token != null;
  }

  logout(): Observable<any> {
    return this._httpClient.post<any>(`${environment.apiUrl}${this.logout_}`, {}, {withCredentials: true})
      .pipe(
        tap(() => {
          //localStorage.removeItem("token")
          this._currentUser.next(null);
          //this.router.navigate(['/login'])
        })
      )
  }

}

