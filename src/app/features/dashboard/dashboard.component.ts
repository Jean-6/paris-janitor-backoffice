import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {

  }

  logout(){
    this.authService.logout();
  }

}
