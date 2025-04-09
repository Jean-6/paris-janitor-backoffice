import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../_services/user.service";

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
  myForm!: FormGroup;

  services!: Services[]
  selectedServices!: Services[];

  status!: Status[]
  selectedStatus!: Status[];

  firstnameSugg=[];


  constructor( private router: Router,
               private fb: FormBuilder,
               protected userService: UserService) {

  }

  ngOnInit() {

    this.services = [
      { name: 'servicesCheck-in et check out des clients',code: 'Maison'},
      { name: 'Nettoyage du logement',code: 'Appartement'},
      { name: 'Publication des annonces avec mise en valeur du logement par le biais de photos de qualité et communication avec les voyageurs',code: 'Loft'},
      { name: 'Contact (le service client est accessible 24h/24 et 7j/7)',code: 'Villa'},
      { name: 'Optimisation des tarifs de location',code: 'Villa'},
      { name: 'Fourniture de linge de maison',code: 'Villa'},
      { name: 'Travaux d’entretien, petites réparations',code: 'Villa'},
      { name: 'Petite maintenance et réparations ponctuelles',code: 'Villa'},
      { name: 'Changement des ampoules',code: 'Villa'},
      { name: 'Petits travaux de plomberie',code: 'Villa'},
      { name: 'Réparation du mobilier',code: 'Villa'},
      { name: 'Transport de et vers aéroport',code: 'Villa'}
    ]

    this.status = [
      { name: 'Client-Bailleur',code: 'client'},
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


  }

  logout(){
    //this.authService.logout();
  }

  ngOnDestroy(): void {
  }

  onSubmit() {

  }

  search($event: any) {

  }
}
