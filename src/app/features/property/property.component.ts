import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PropertyService} from "../../_services/property.service";
import {AlertService} from "../../_services/alert.service";
import {LocationService} from "../../_services/location.service";

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


  constructor(private fb: FormBuilder,
              protected propertyService: PropertyService,
              protected locationService: LocationService,
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
    this.locationService.loadCities();
    this.locationService.loadDepartments();
  }

  onSubmit(){

  }

  ngOnDestroy(): void {
  }

}
