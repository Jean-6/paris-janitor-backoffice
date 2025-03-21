import {Injectable/*, signal, Signal*/} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {User} from "../_models/User";
import {AuthResponse} from "../_dto/authResponse";
import {Router} from "@angular/router";



@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = "http://localhost:9090/api/auth/login";
  private apiUrlRegister ="http://localhost:9090/api/auth/register";
  private apiUrlLogout ="http://localhost:9090/api/auth/logout";
  private apiUrlRefreshToken ="http://localhost:9090/api/auth/refresh-token";

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


}

