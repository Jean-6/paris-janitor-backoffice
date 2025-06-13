import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AsideMenuComponent} from "./aside-menu/aside-menu.component";
import {LoadingComponent} from "./loading/loading.component";
import {NavbarTopComponent} from "./navbar-top/navbar-top.component";
import {ProfileComponent} from "./profile/profile.component";
import {PropertyComponent} from "./property/property.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {MultiSelectModule} from "primeng/multiselect";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {InputNumberModule} from "primeng/inputnumber";
import {PaginatorModule} from "primeng/paginator";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    AsideMenuComponent,
    LoadingComponent,
    NavbarTopComponent,
    ProfileComponent,
    PropertyComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    DialogModule,
    MultiSelectModule,
    TableModule,
    TagModule,
    FormsModule,
    InputNumberModule,
    PaginatorModule,
    RouterLink
  ],
  exports:[
    AsideMenuComponent,
    LoadingComponent,
    NavbarTopComponent

  ]
})
export class SharedModule { }
