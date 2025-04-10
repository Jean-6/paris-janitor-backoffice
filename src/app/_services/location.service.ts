import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {Commune} from "../_dto/commune";
import {HttpClient} from "@angular/common/http";
import {Department} from "../_dto/department";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrlCommune = 'https://geo.api.gouv.fr/communes';
  private apiUrlDepartment = 'https://geo.api.gouv.fr/departements/';
  private _communes$ = new BehaviorSubject<Commune[]>([]);
  private _loading$ = new BehaviorSubject<boolean>(false);


  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }
  get communes$(): Observable<Commune[]> {
    return this._communes$.asObservable();
  }

  constructor(private httpClient: HttpClient) { }

  getCommunesFromServer():Observable<Commune[]>{
    return this.httpClient.get<Commune[]>(`${this.apiUrlCommune}`).pipe(
      tap(response => console.log('Raw response of commune: ', response)),
      map(communes =>
        communes.map(commune => ({
          fullname: `${commune.nom} (${commune.codesPostaux[0]})`,
          nom: commune.nom,
          code: commune.code,
          codeDepartement: commune.codeDepartement,
          codesPostaux: commune.codesPostaux
        }))
      ),
      tap(communes => {this._communes$.next(communes)})
    );
  }

  getDepartmentsFromServer():Observable<Department[]>{
    return this.httpClient.get<Department[]>(`${this.apiUrlDepartment}`).pipe(
      tap(response => console.log('Raw response of department od department:', response)),
      map(departments =>
        departments.map(department => ({
          fullname: `${department.nom} (${department.code})`,
          nom: `${department.nom}`,
          code: department.code,
        })))
    )
  }

  private setLoadingStatus(isLoading: boolean): void {
    this._loading$.next(isLoading);
  }
}
