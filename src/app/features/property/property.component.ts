import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit{

  myForm!: FormGroup;


  constructor(private _httpClient: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({

      type:[],
      budgetMin:[],
      budgetMax:[],
      city:[],
      zip:[],
      areaMin:[],
      areaMax:[]
    })
  }

  onSubmit(){

  }

}
