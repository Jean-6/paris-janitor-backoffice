import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SearchPropertyDto} from "../_dto/searchPropertyDto";
import {Observable} from "rxjs";
import {Property} from "../_models/Property";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private apiUrlPropertyData = "http://localhost:8081/api/property/";
  searchPropertyDto: SearchPropertyDto = new SearchPropertyDto();

  constructor(private _httpClient: HttpClient) {}

  addProperty(formData: any): Observable<any> {
    return this._httpClient.post<any>(`${this.apiUrlPropertyData}`, formData);
  }

  retrieveProperties():Observable<Property[]>{
    return this._httpClient.get<Property[]>(`${this.apiUrlPropertyData}`)
  }

  retrieveProperty(propertyId:string): Observable<Property>{
    return  this._httpClient.get<Property>(`${this.apiUrlPropertyData}getBy/${propertyId}`)
  }

}
