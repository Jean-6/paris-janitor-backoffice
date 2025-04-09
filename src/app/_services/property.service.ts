import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {SearchPropertyDto} from "../_dto/searchPropertyDto";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private apiUrlPropertyData = "http://localhost:9090/api/auth/login";
  private apiUrlImageData ="http://localhost:9090/api/auth/register";
  //searchPropertyDto = new BehaviorSubject<SearchPropertyDto | null>(null);
  searchPropertyDto: SearchPropertyDto = new SearchPropertyDto();
  selectedServices=[];
  constructor(private _httpClient: HttpClient, private router: Router) {}
  /*searchProperty(): Observable<SearchPropertyDto> {

  }*/
}
