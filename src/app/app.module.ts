import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoadingComponent } from './features/shared/loading/loading.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { AsideMenuComponent } from './features/shared/aside-menu/aside-menu.component';
import { PropertyComponent } from './features/property/property.component';
import { DetailsComponent } from './features/property/details/details.component';
import { AddPropertyComponent } from './features/property/add-property/add-property.component';
import {InputSwitchModule} from "primeng/inputswitch";
import {InputNumberModule} from "primeng/inputnumber";
import {CalendarModule} from "primeng/calendar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastModule} from "primeng/toast";
import { MessageModule } from 'primeng/message';
import {MessageService} from "primeng/api";
import { UserComponent } from './features/user/user.component';
import { NavbarComponent } from './features/shared/navbar/navbar.component';
import {MultiSelectModule} from "primeng/multiselect";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FileUploadModule} from "primeng/fileupload";
import {BadgeModule} from "primeng/badge";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LoadingComponent,
    AsideMenuComponent,
    PropertyComponent,
    DetailsComponent,
    AddPropertyComponent,
    UserComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProgressSpinnerModule,
    InputSwitchModule,
    InputNumberModule,
    CalendarModule,
    BrowserAnimationsModule,
    ToastModule,
    MessageModule,
    MultiSelectModule,
    FormsModule,
    AutoCompleteModule,
    FileUploadModule,
    BadgeModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
