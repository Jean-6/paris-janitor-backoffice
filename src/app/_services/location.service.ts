import { Injectable } from '@angular/core';
import {catchError, map, Observable, of, shareReplay, tap} from "rxjs";
import {City} from "../_dto/city";
import {HttpClient} from "@angular/common/http";
import {AlertService} from "./alert.service";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrlCommune = 'https://geo.api.gouv.fr/communes';
  private apiUrlDepartment = 'https://geo.api.gouv.fr/departements/';
  private communes$: Observable<any[]> | null = null;
  private departments$: Observable<any[]> | null = null;

  constructor(private httpClient: HttpClient,
              private alert: AlertService) { }

  getCommunesFromServer():Observable<any[]>{

    if(!this.communes$){ // if also charged , return cached version
      this.communes$ = this.httpClient.get<City[]>(`${this.apiUrlCommune}`).pipe(
        tap(response => console.log('Raw response of commune: ', response)),
        map(communes =>
          communes.map(commune=>({
            fullname: `${commune.nom} (${commune.codesPostaux[0]})`,
            nom: commune.nom,
            code: commune.code,
            codeDepartement: commune.codeDepartement,
            codesPostaux: commune.codesPostaux
          }))),
        shareReplay(1), // cached version
        catchError(err =>{
          console.error('Erreur lors du chargement des communes',err);
          this.alert.error("Erreur lors du chargement des communes")
          this.communes$ = null;
          return of([]); // return empty list in case of error
        })
      );
    }
    return this.communes$;
  }

  getDepartmentsFromServer():Observable<any[]>{
    if(!this.departments$){
      this.departments$ = this.httpClient.get<City[]>(`${this.apiUrlDepartment}`).pipe(
        tap(response => console.log('Raw response of department: ', response)),
        map(departments =>
          departments.map(dept=>({
            fullname: `${dept.nom} (${dept.code})`,
            nom: dept.nom,
            code: dept.code
          }))),
        shareReplay(1),
        catchError(err =>{
          console.error('Erreur lors du chargement des departements',err);
          this.alert.error("Erreur lors du chargement des departements")
          this.departments$ = null;
          return of([]); // return empty list in case of error
        })
      );
    }
    return this.departments$;
  }

}
