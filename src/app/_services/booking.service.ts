import { Injectable } from '@angular/core';
import {Booking} from "../_models/Booking";
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrlBookingData = "http://localhost:8081/api/booking/";
  private apiUrlBookingDataByProperty = "http://localhost:8081/api/booking/property";

  constructor(private _httpClient: HttpClient){}

  createBookings(booking: Booking[]): Observable<Booking> {
    return this._httpClient.post<Booking>(`${this.apiUrlBookingData}`, booking)
  }
  getBookingsByProperty(propertyId: string): Observable<Booking[]>{
    return this._httpClient.get<Booking[]>(`${this.apiUrlBookingDataByProperty}/${propertyId}`).pipe(
      tap(data => console.log(data))
    );
  }
}
