import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, tap} from "rxjs";
import {City} from "../_dto/city";
import {HttpClient} from "@angular/common/http";
import {AlertService} from "./alert.service";
import {Department} from "../_dto/department";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private apiUrlCities = 'https://geo.api.gouv.fr/communes';
  private apiUrlDepartments = 'https://geo.api.gouv.fr/departements/';

  cities: City[] = [];
  citiesSubject = new BehaviorSubject<City[]>([]);

  departments: Department[] = [];
  private departmentsSubject = new BehaviorSubject<Department[]>([]);

  filteredCity: City[] = [];
  filteredDepartment: Department[] = [];

  constructor(private httpClient: HttpClient,
              private alert: AlertService) {
    this.loadCities();
  }

  loadCities_(): void {
    this.httpClient.get<City[]>(`${this.apiUrlCities}`).pipe(
      map(communes =>
        communes.map(commune => ({
          nameAndPostCode: `${commune.nom} (${commune.codesPostaux[0]})`,
          nom: commune.nom,
          codesPostaux: commune.codesPostaux
        }))),
      catchError(err => { //Manage http request and operator(tap,map from pipe) error
        console.error('Erreur lors du chargement des communes', err);
        this.alert.error("Erreur lors du chargement des communes")
        return of([]); // return empty list in case of error
      })
    ).subscribe({
      next: (data) => this.citiesSubject.next(data),
      error: (err) => console.error('Error loading cities')
    });
  }

  loadCities(): void {
    if (this.cities.length === 0) { // if also charged , return cached version
      this.httpClient.get<City[]>(`${this.apiUrlCities}`).pipe(
        map(communes =>
          communes.map(commune => ({
            nameAndPostCode: `${commune.nom} (${commune.codesPostaux[0]})`,
            nom: commune.nom,
            codesPostaux: commune.codesPostaux
          }))),
        catchError(err => { //Manage http request and operator(tap,map from pipe) error
          console.error('Erreur lors du chargement des communes', err);
          this.alert.error("Erreur lors du chargement des communes")
          return of([]); // return empty list in case of error
        })
      ).subscribe(cities => {
        this.cities = cities;
        this.citiesSubject.next(cities);
      });
    } else {
      this.citiesSubject.next(this.cities);
    }
  }

  loadCities1(): Observable<any> {
    return this.httpClient.get<City[]>(`${this.apiUrlCities}`).pipe(
      map(communes =>
        communes.map(commune => ({
          nameAndPostCode: `${commune.nom} (${commune.codesPostaux[0]})`,
          nom: commune.nom,
          codesPostaux: commune.codesPostaux
        }))),
      catchError(err => { //Manage http request and operator(tap,map from pipe) error
        console.error('Erreur lors du chargement des communes', err);
        this.alert.error("Erreur lors du chargement des communes")
        return of([]); // return empty list in case of error
      })
    )
  }

  loadDepartments(): void {
    if (this.departments.length === 0) {
      this.httpClient.get<Department[]>(`${this.apiUrlDepartments}`).pipe(
        //tap(response => console.log('Raw response of department: ', response)),
        map(departments =>
          departments.map(dept => ({
            nameAndCode: `${dept.nom} (${dept.code})`,
            nom: dept.nom,
            code: dept.code,
          }))),
        catchError(err => {
          console.error('Erreur lors du chargement des departements', err);
          this.alert.error("Erreur lors du chargement des departements")
          return of([]); // return empty list in case of error
        })
      ).subscribe((departments) => {
        this.departments = departments;
        this.departmentsSubject.next(departments)
      })
    } else {
      this.departmentsSubject.next(this.departments);
    }
  }

  searchDepartment(event: any) {
    let filtered: Department[] = [];
    let query = event.query;
    this.departments.forEach((department, index) => {
      if (this.departments[index].nom.toLowerCase().includes(query.toLowerCase()) ||
        this.departments[index].nameAndCode.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(department);
      }
    });
    this.filteredDepartment = filtered;
  }

  searchCity(event: any) {
    let filtered: City[] = [];
    let query = event.query;
    this.cities.forEach((city, index) => {
      console.log(city)
      if (this.cities[index].nom.toLowerCase().includes(query.toLowerCase()) ||
        this.cities[index].nameAndPostCode.toLowerCase().includes(query.toLowerCase())) {
        console.log(city)
        filtered.push(city)
      }
    });
    this.filteredCity = filtered;
  }

  loadDepartments_(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(`${this.apiUrlDepartments}`).pipe(
      map(departments =>
        departments.map(dept => ({
          nameAndCode: `${dept.nom} (${dept.code})`,
          nom: dept.nom,
          code: dept.code,
        }))
      )
    );
  }

}
