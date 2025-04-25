import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../_services/user.service";
import {LocationService} from "../../_services/location.service";
import {AlertService} from "../../_services/alert.service";

interface Services {
  name: string,
  code: string
}

interface Status {
  name: string,
  code: string
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,OnDestroy{

  submitted: boolean = false;


  userDialog: boolean = false;
  protected users_: {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    quantity: number;
    inventoryStatus: string;
    rating: number;
  }[] = [];

  /**/
  myForm!: FormGroup;

  services!: Services[]
  selectedServices!: Services[];

  status!: Status[]
  users: { fullName: string }[] = [];

  filteredUser: { fullName:string }[] = [];
  selectedUsers: any;


  constructor(private router: Router,
              private fb: FormBuilder,
              protected userService: UserService,
              protected locationService: LocationService,
              private alert: AlertService) {

  }

  ngOnInit() {

    this.users_ = [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },
      {
        id: '1001',
        code: 'nvklal433',
        name: 'Black Watch',
        description: 'Product Description',
        image: 'black-watch.jpg',
        price: 72,
        category: 'Accessories',
        quantity: 61,
        inventoryStatus: 'INSTOCK',
        rating: 4
      }
      // Ajoute d'autres produits ici
    ];

    this.services = [
      { name: 'Check-in/check-out',code: 'check-inCheck out '},
      { name: 'Nettoyage',code: 'cleaning'},
      { name: 'Publication',code: 'publish'},
      { name: 'Contact',code: 'contact'},
      { name: 'Optimisation tarifs',code: 'optimisation'},
      { name: 'Fournitures',code: 'Villa'},
      { name: 'Travaux d’entretien',code: 'Cleaning'},
      { name: 'Maintenance/Réparations',code: 'Maintenance'},
      { name: 'Transport',code: 'Transport'}
    ]

    this.status = [
      { name: 'Client/Bailleur',code: 'client'},
      { name: 'Voyageurs',code: 'voyageur'},
      { name: 'Prestataire',code: 'pretataire'},
    ]

    this.myForm = this.fb.group({
      status:[],
      service:[],
      firstname:[],
      lastname:[],
      location:[],
      /*availability date*/
      from:[],
      to:[]
    })

    this.initObservables();
  }

  openNew() {
    this.userDialog = true;
  }

  private initObservables(){
    this.locationService.loadCities();
    this.locationService.loadDepartments();
  }

  onSubmit() {
  }

  ngOnDestroy(): void {
  }

  searchUsername(event: any) {

  }

  editUserProfile(users_: any) {
    this.userDialog = true;
  }

  deleteUserProfile(users_: any) {

  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  saveData() {
    this.submitted = true;

  }

  searchDepartment($event: any) {

  }

  searchCity($event: any) {

  }
}
