import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CharacteristicsComponent} from "./characteristics/characteristics.component";
import {UploadImageComponent} from "./upload-image/upload-image.component";
import {UploadReceiptComponent} from "./upload-receipt/upload-receipt.component";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputNumberModule} from "primeng/inputnumber";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PanelModule} from "primeng/panel";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {AddPropertyComponent} from "./add-property.component";
import {StepsModule} from "primeng/steps";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    //AsideMenuComponent,
    //LoadingComponent,
    //NavbarTopComponent,
    AddPropertyComponent,
    CharacteristicsComponent,
    UploadImageComponent,
    UploadReceiptComponent,

  ],
  imports: [
    CommonModule,
    PanelModule,
    InputSwitchModule,
    ToastModule,
    InputNumberModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    InputTextareaModule,
    InputTextModule,
    StepsModule,
    SharedModule,
  ],
  providers: [ MessageService ]
})
export class AddPropertyModule { }
