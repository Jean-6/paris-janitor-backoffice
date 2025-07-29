import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SearchUserDto} from "../_dto/searchUserDto";
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../_models/User";
import {AlertService} from "./alert.service";
import {Department} from "../_dto/department";
import {SearchPropertyDto} from "../_dto/searchPropertyDto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrlUser ="http://localhost:9090/api/user";
  searchUserDto: SearchUserDto = new SearchUserDto();
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();



  constructor(private _httpClient: HttpClient,
              private alert: AlertService) {}

  loadUsers(){
    this._httpClient.get<User[]>(this.apiUrlUser)
      .subscribe({
      next: (data) => this.usersSubject.next(data),
      error: (err) => {
        console.error('Erreur chargement des utilisateurs', err);
        this.alert.error("Erreur chargement des utilisateurs", err);
        this.usersSubject.next([]);
      },
      complete: () => {
        console.log('Chargement des utilisateurs terminé');
      }
    });
  }

  addProperty(formData: any): Observable<any> {
    return this._httpClient.post<any>(`${this.apiUrlUser}`, formData);
  }

  changeStatus(formData: FormData): Observable<any>{
    return this._httpClient.post<any>(`${this.apiUrlUser}/change-status-request`, {formData},{
      withCredentials:true
    });
  }

}

