import {
  Component,
  inject,
  Output,
  Input,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {AuthService} from "../../../../_services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../../../_services/alert.service";
import { LocationService } from 'src/app/_services/location.service';
import {City} from "../../../../_dto/city";

@Component({
  selector: 'app-characterics',
  templateUrl: './characterics.component.html',
  styleUrls: ['./characterics.component.css']
})
export class CharactericsComponent implements OnInit,OnChanges {

  /*Steps interactive*/
  items: MenuItem[] = [];
  cities:City[] = [] ;

  @Input() formData: any = {
    type: '',
    address: '',
    city: '',
    area: '',
    peaces: '',
    rooms: '',
    bathrooms: '',
    isFurnished: false,
    wifi: false,
    airConditioning: false,
    garage: false,
    equippedKitchen: false,
    outdoorSpaces: false
  };

  // Parent data
  @Output() formDataUpdated = new EventEmitter<any>();  // Transmitter to change data
  @Output() next = new EventEmitter<void>(); // Transmitter to change steps
  @Input() activeIndex: number = 0;
  @Output() activeIndexChange = new EventEmitter<number>();
  form!: FormGroup;

  authService=inject(AuthService);

  constructor(private formBuilder: FormBuilder,
              private alert: AlertService,
              public messageService: MessageService,
              protected locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.loadCities(); // S'assurer que les villes sont chargées
    this.form = this.formBuilder.group({
      type: [this.formData.type],
      address: [this.formData.address] ,
      city: [this.formData.city || ''] ,
      area:[this.formData.area] ,
      peaces:[this.formData.peaces] ,
      rooms:new FormControl('',Validators.required),
      bathrooms:new FormControl('',Validators.required),
      isFurnished:[this.formData.isFurnished],
      wifi:[this.formData.wifi],  // Wi-Fi
      airConditioning: [this.formData.airConditioning], // Climatisation
      garage: [this.formData.garage], // Garage
      equippedKitchen: [this.formData.equippedKitchen],  // Cuisine équipée
      outdoorSpaces: [this.formData.outdoorSpaces]  // Espaces extérieurs
    });


    this.locationService.citiesSubject.subscribe(data=>this.cities=data)
    console.log("characteristiques : "+this.cities)
  }

  onNext() {
    if(this.form.valid){
      this.formDataUpdated?.emit(this.form.value);
      this.next.emit();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData'] && this.form) {
      this.form.patchValue(this.formData);
    }
  }
}
