
import {City} from "../_dto/city";


export interface Address {
  address: string;
  city: string;
}

export interface Facilities{
  isFurnished: boolean;         // Meublé
  wifi: boolean;              // Wi-Fi
  airConditioning: boolean;   // Climatisation
  equippedKitchen: boolean;   // Cuisine équipée
  garage: boolean;            // Garage
  outdoorSpaces: boolean;     // Espaces extérieurs
}

export interface Details{
  type : string ,
  address : string ,
  city : City,
  area : number,
  peaces : number,
  rooms : number,
  bathrooms : number,
  description : string
}
export interface Financial{
  rent: number;
}

export interface owner {
  id : string
}

export enum Status {

}

export interface Property {
  id: string,
  details : Details,
  address : Address,
  facilities : Facilities,
  financial : Financial,
  createdAt : Date,
  status : Status
}
