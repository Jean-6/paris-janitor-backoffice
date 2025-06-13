import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PropertyService} from "../../../_services/property.service";
import {LocationService} from "../../../_services/location.service";
import {AlertService} from "../../../_services/alert.service";
import {UserService} from "../../../_services/user.service";
import {Property} from "../../../_models/Property";
import {Image} from "../../../_models/Image";
import {forkJoin} from "rxjs";
import {AttachmentService} from "../../../_services/attachment.service";


interface TypeOfProperty {
  name: string,
  code: string
}


@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit{

  hasError = false;
  myForm!: FormGroup;
  typeOfProperty!: TypeOfProperty[];
  propertyWithImage?: (Property & { image?: Image })[];
  isLoading = false;
  rows = 1;
  first = 10;


  constructor(private fb: FormBuilder,
              protected propertyService: PropertyService,
              protected attachmentService:AttachmentService,
              protected userService: UserService,
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

  }

  private initObservables(){
    this.locationService.loadCities();
    this.locationService.loadDepartments();
    this.combinePropertyDataWithImages();
  }


  private combinePropertyDataWithImages() {

    this.isLoading = true;
    forkJoin({
      properties: this.propertyService.retrieveProperties(),
      images: this.attachmentService.retrieveImages()
    }).subscribe({
      next: ({ properties, images }) => {
        this.propertyWithImage = properties.map(property => {
          const image = images.find(img => img.propertyId === property.id);
          return {
            ...property,
            image
          };
        });
        console.log(this.propertyWithImage);
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error loading combinePropertyDataWithImages");
        this.alert.error("Unexpected error has occured : {}", err);
        this.hasError = false;
        this.isLoading = true;
      }
    });
  }

  ngOnDestroy(): void {
  }

  onPageChange($event: any) {

  }
}
