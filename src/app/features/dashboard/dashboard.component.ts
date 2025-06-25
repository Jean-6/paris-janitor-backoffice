import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {CommonModule} from "@angular/common";
import {AsideMenuComponent} from "../shared/aside-menu/aside-menu.component";
import {AppModule} from "../../app.module";
import {NavbarTopComponent} from "../shared/navbar-top/navbar-top.component";
import {LoadingComponent} from "../shared/loading/loading.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(protected authService: AuthService) {

  }

  ngOnInit() {
  }
}
