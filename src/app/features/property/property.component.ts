import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Commune} from "../../_dto/commune";
import {CommuneService} from "../../_services/commune.service";
import {PropertyService} from "../../_services/property.service";



interface Service {
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
  loading$!: Observable<boolean>;
  commune$!: Observable<Commune[]>;


  services!: Service[]
  selectedServices!: Service[];

  constructor(private _httpClient: HttpClient,
              private fb: FormBuilder,
              protected propertyService: PropertyService,
              private communeService: CommuneService) {
    this.services = [
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

    this.communeService.getCommunesFromServer()
      .subscribe({
      next:(data:any)=>{
        console.log(data);

    }
      })
    this.myForm.valueChanges.subscribe(
      value => {
        console.log(value);
        this.propertyService.searchPropertyDto=value;
      }
    )
  }

  private initObservables(){
    this.loading$ = this.communeService.loading$;
    this.commune$ = this.communeService.communes$;
  }

  onSubmit(){



  }

  ngOnDestroy(): void {
  }


}
