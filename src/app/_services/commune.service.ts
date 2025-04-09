import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {Commune} from "../_dto/commune";

@Injectable({
  providedIn: 'root'
})
export class CommuneService {

  private apiUrlCommune = 'https://geo.api.gouv.fr/communes';
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
      tap(response => console.log('Reponse API brute: ', response)),
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

  private setLoadingStatus(isLoading: boolean): void {
    this._loading$.next(isLoading);
  }
}
