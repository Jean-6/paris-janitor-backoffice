import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {City} from "../../../_dto/city";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../_services/auth.service";
import {AlertService} from "../../../_services/alert.service";
import {LocationService} from "../../../_services/location.service";
import {PropertyType} from "../../../_models/PropertyType";

@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.css']
})
export class CharacteristicsComponent implements OnInit ,OnChanges{

  /*Steps interactive*/
  items: MenuItem[] = [];
  cities:City[] = [] ;
  filteredCities:City[]=[];
  propertyType : PropertyType[] = [];

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
    equippedKitchen: false,
    garage: false,
    outdoorSpaces: false,
    rent: 0,
    description: '',
    ownerId:'',
    images: [],
    documents: []
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

    this.propertyType = [
      {name: '', code: ''},
      {name: 'Appartement', code: 'Appartment'},
      {name: 'Maison', code: 'Home'},
      {name: 'Studio', code: 'Studio'},
    ]

    this.locationService.loadCities1().subscribe({
      next:(data)=> this.cities =data
    }); // S'assurer que les villes sont chargées
    this.form = this.formBuilder.group({
      type: [this.formData.type || '', [/*Validators.required,this.validateTypeOf('string','invalidateType')*/]],
      address: [this.formData.address || '', [/*Validators.required,this.validateTypeOf('string','invalidateAddress')*/]] ,
      city: [this.formData.city || '', [/*Validators.required,this.validateTypeOf('object','invalidateCity')*/]],
      area:[this.formData.area || '', [/*Validators.required,this.validateInputNumber.bind(this)*/]] ,
      peaces:[this.formData.peaces || '', [/*Validators.required/*,this.validateInputNumber.bind(this)*/]] ,
      rooms:[this.formData.room || ''] ,
      bathrooms:[this.formData.peaces || '', [/*Validators.required,this.validateInputNumber.bind(this)*/]] ,
      isFurnished:[this.formData.isFurnished],
      wifi:[this.formData.wifi],
      airConditioning: [this.formData.airConditioning],
      equippedKitchen: [this.formData.equippedKitchen],
      garage: [this.formData.garage],
      outdoorSpaces: [this.formData.outdoorSpaces],
      rent: [this.formData.rent],
      images: [''],
      documents: [''],
      description: [this.formData.description || '', [/*Validators.required,this.validateTypeOf('string','invalidateDescription',10)*/]],
    });


    this.locationService.citiesSubject.subscribe(data=>this.cities=data)
    console.log("characterics : "+this.cities)
  }

  validateTypeOf = (expectedType: string, errorKey: string, minLength: number = 0 ) => {
    return (control: FormControl) => {
      const value = control.value;
      if(!value || typeof value !== expectedType){
        return errorKey;
      }
      if(expectedType === 'string' && value.length <  minLength){
        return errorKey;
      }
      return null;
    }
  }

  validateInputNumber(control: FormControl){
    const value = control.value;
    if(value == 0 || typeof value !== 'number' ){
      return { invalidNumber: true };
    }
    return null;
  }

  onNext() {
    if(this.form.valid){
      ///console.log(this.form.value);
      this.activeIndex++;
      this.activeIndexChange.emit(this.activeIndex);
      this.formDataUpdated?.emit(this.form.value);
      this.next.emit();

    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData'] && this.form) {
      this.form.patchValue(this.formData);
    }
  }

  filterCity(event:any) {
    let filtered: City[]  = [];
    let query =  event.query;
    console.log("test :"+query.toLowerCase());
    console.log(this.cities.length)
    this.cities.forEach((city,index)=>{
      console.log(city)
      if(this.cities[index].nom.toLowerCase().includes(query.toLowerCase()) ||
        this.cities[index].nameAndPostCode.toLowerCase().includes(query.toLowerCase())){
        console.log(city)
        filtered.push(city)
      }
    });
    this.filteredCities = filtered;
  }
}
