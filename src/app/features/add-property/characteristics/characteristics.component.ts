import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {City} from "../../../_dto/city";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../../_services/alert.service";
import {LocationService} from "../../../_services/location.service";
import {PropertyType} from "../../../_models/PropertyType";
import {Characteristics} from "../../../_models/Characteristics";

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

  @Input() propertyFormData: Characteristics = {
    type: '',
    address: '',
    city: '',
    area: 0,
    peaces: 0,
    rooms: 0,
    bathrooms: 0,
    isFurnished: false,
    wifi: false,
    airConditioning: false,
    equippedKitchen: false,
    garage: false,
    outdoorSpaces: false,
    rent: 0,
    description: '',
    ownerId:'',

  };

  // Parent data
  @Output() formDataUpdated = new EventEmitter<any>();  // Transmitter to change data
  @Output() next = new EventEmitter<void>(); // Transmitter to change steps
  @Output() activeIndexChange = new EventEmitter<number>();
  @Input() activeIndex: number = 0;

  form!: FormGroup;

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
    this.locationService.citiesSubject.subscribe(data=>this.cities=data)

    this.initForm();
  }

  private initForm(): void {

    this.form = this.formBuilder.group({
      characteristics: this.formBuilder.group({
        type: [this.propertyFormData?.type || '', [/*Validators.required,this.validateTypeOf('string','invalidateType')*/]],
        address: [this.propertyFormData?.address || '', [/*Validators.required,this.validateTypeOf('string','invalidateAddress')*/]] ,
        city: [this.propertyFormData?.city || '', [/*Validators.required,this.validateTypeOf('object','invalidateCity')*/]],
        area:[this.propertyFormData?.area || '', [/*Validators.required,this.validateInputNumber.bind(this)*/]] ,
        peaces:[this.propertyFormData?.peaces || '', [/*Validators.required/*,this.validateInputNumber.bind(this)*/]] ,
        rooms:[this.propertyFormData?.rooms || ''] ,
        bathrooms:[this.propertyFormData?.bathrooms || '', [/*Validators.required,this.validateInputNumber.bind(this)*/]] ,
        isFurnished:[this.propertyFormData?.isFurnished],
        wifi:[this.propertyFormData?.wifi],
        airConditioning: [this.propertyFormData?.airConditioning],
        equippedKitchen: [this.propertyFormData?.equippedKitchen],
        garage: [this.propertyFormData?.garage],
        outdoorSpaces: [this.propertyFormData?.outdoorSpaces],
        rent: [this.propertyFormData?.rent],
        description: [this.propertyFormData.description || '', [/*Validators.required,this.validateTypeOf('string','invalidateDescription',10)*/]],
      })
     });

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
      const propertyCharacteristics = this.form.get('characteristics')?.value;
      this.formDataUpdated?.emit(propertyCharacteristics);
      this.activeIndex++;
      this.activeIndexChange.emit(this.activeIndex);
      this.next.emit();
    }else{
      this.alert.warn("Veuillez renseigner tous les champs")
    }
  }

  filterCity(event:any) {
    let filtered: City[]  = [];
    let query =  event.query;
    this.cities.forEach((city,index)=>{
      if(this.cities[index].nom.toLowerCase().includes(query.toLowerCase()) ||
        this.cities[index].nameAndPostCode.toLowerCase().includes(query.toLowerCase())){
        filtered.push(city)
      }
    });
    this.filteredCities = filtered;
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['propertyFormData'] && changes['propertyFormData'].currentValue) {
      this.initForm()
    }
  }
}
