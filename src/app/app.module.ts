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
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {ChipsModule} from "primeng/chips";
import {TagModule} from "primeng/tag";
import {FieldsetModule} from "primeng/fieldset";
import {PanelModule} from "primeng/panel";
import {StepsModule} from "primeng/steps";
import { UploadImageComponent } from './features/property/add-property/upload-image/upload-image.component';
import { UploadReceiptComponent } from './features/property/add-property/upload-receipt/upload-receipt.component';
import {ToolbarModule} from "primeng/toolbar";
import {InputTextareaModule} from "primeng/inputtextarea";
import { ConfirmationComponent } from './features/property/add-property/confirmation/confirmation.component';
import { CharacteristicsComponent } from './features/property/add-property/characteristics/characteristics.component';
import {CardModule} from "primeng/card";
import { PropertyListComponent } from './features/shared/property-list/property-list.component';
import { PropertyDetailsComponent } from './features/shared/property-details/property-details.component';
import {GalleriaModule} from "primeng/galleria";
import {FullCalendarModule} from "@fullcalendar/angular";

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
    AddPropertyComponent,
    UserComponent,
    NavbarComponent,
    UploadImageComponent,
    UploadReceiptComponent,
    ConfirmationComponent,
    CharacteristicsComponent,
    PropertyListComponent,
    PropertyDetailsComponent
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
    BadgeModule,
    TableModule,
    DialogModule,
    ChipsModule,
    TagModule,
    FieldsetModule,
    PanelModule,
    StepsModule,
    ToolbarModule,
    InputTextareaModule,
    CardModule,
    GalleriaModule,
    FullCalendarModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
