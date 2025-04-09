import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../_services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit,OnDestroy{


  authService=inject(AuthService);
  currentStep: number=2;
  steps!: FormGroup[];


  constructor(private formBuilder: FormBuilder, private router: Router) {

    this.steps=[
      this.formBuilder.group({
        type:new FormControl('',Validators.required),
      }),
      this.formBuilder.group({
        address:new FormControl('',Validators.required),
      }),
      this.formBuilder.group({
        area:[],
        nbOfPieces:[],
        nbOfWaterroom:[],
        nbOfBathroom:[],
        isFurnished:[]

      }),
      this.formBuilder.group({

      })
    ]
  }


  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  previousStep(){
    if(this.currentStep > 0) this.currentStep--;
  }

  nextStep(){
    if(this.steps[this.currentStep].valid) this.currentStep++
  }

  submitMultiStepForm(){

  }

}
