import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {City} from "../../_dto/city";
import {PropertyService} from "../../_services/property.service";
import {AlertService} from "../../_services/alert.service";
import {LocationService} from "../../_services/location.service";
import {Department} from "../../_dto/department";


interface TypeOfProperty {
  name: string,
  code: string
}

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})


export class PropertyComponent implements OnInit,OnDestroy{

  myForm!: FormGroup;

  typeOfProperty!: TypeOfProperty[]
  allCities: City[]=[];
  allDepartments: Department[]=[];
  filteredCity:City[]=[];
  filteredDepartment:Department[]=[];

  constructor(private _httpClient: HttpClient,
              private fb: FormBuilder,
              protected propertyService: PropertyService,
              private locationService: LocationService,
              private alert: AlertService) {


    this.typeOfProperty = [
      { name: 'Maison',code: 'Maison'},
      { name: 'Appartment',code: 'Appartement'},
      { name: 'Loft',code: 'Loft'},
      { name: 'Villa',code: 'Villa'},
    ]
  }

  ngOnInit(): void {

    this.initObservables();

    this.myForm = this.fb.group({
      type:[[]],
      department:[[]],
      city:[[]],
      budgetMin:[],
      budgetMax:[],
      areaMin:[],
      areaMax:[],
      arrival:[],
      departure:[]
    })

    this.myForm.valueChanges.subscribe(
      value => {
        this.propertyService.searchPropertyDto=value;
      }
    )
  }

  private initObservables(){
    this.locationService.getCommunesFromServer().subscribe(data=>{this.allCities=data;});
    this.locationService.getDepartmentsFromServer().subscribe(data=>{this.allDepartments=data;})
  }

  onSubmit(){

  }

  ngOnDestroy(): void {
  }

  searchDepartment(event:any) {
    let filtered: Department[]  = [];
    let query =  event.query;
    this.allDepartments.forEach(department=>{
      if(department.nom.toLowerCase().includes(query.toLowerCase())) filtered.push(department);
    })
    this.filteredDepartment = filtered;
  }

  searchCity(event:any) {
    let filtered: City[]  = [];
    let query =  event.query;
    for(let i =0; i< this.allCities.length;i++){
      let commune=this.allCities[i];
      if(this.allCities[i].nom.toLowerCase().includes(query.toLowerCase())){
        filtered.push(commune)
      }
    }
    this.filteredCity = filtered;
  }
}
