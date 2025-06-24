import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {SignupComponent} from './signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputNumberModule} from "primeng/inputnumber";
import {CalendarModule} from "primeng/calendar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastModule} from "primeng/toast";
import {MessageModule} from 'primeng/message';
import {MessageService} from "primeng/api";
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
import {ToolbarModule} from "primeng/toolbar";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CardModule} from "primeng/card";
import {GalleriaModule} from "primeng/galleria";
import {FullCalendarModule} from "@fullcalendar/angular";
import {PaginatorModule} from "primeng/paginator";
import {PickListModule} from "primeng/picklist";
import {BasicAuthInterceptor} from "./_interceptors/basic-auth.interceptor";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {UserComponent} from "./features/user/user.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from './features/shared/shared.module';
import {AddPropertyModule} from "./features/add-property/add-property.module";
import {StatusChangeModule} from "./features/status-change/status-change.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UserComponent,
  ],
  imports: [
    AddPropertyModule,
    SharedModule,
    StatusChangeModule,
    CommonModule,
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
    FullCalendarModule,
    PaginatorModule,
    PickListModule,
  ],
  providers: [MessageService,
    //{
    //provide: HTTP_INTERCEPTORS,
    //useClass: BasicAuthInterceptor,
    //multi: true,
    //}
  ],
  exports: [
    //ValidationStepComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
