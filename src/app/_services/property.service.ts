import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private apiUrlPropertyData = "http://localhost:9090/api/auth/login";
  private apiUrlImageData ="http://localhost:9090/api/auth/register";




  constructor(private _httpClient: HttpClient, private router: Router) {}
}
