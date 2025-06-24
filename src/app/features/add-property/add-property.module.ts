import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CharacteristicsComponent} from "./characteristics/characteristics.component";
import {UploadImageComponent} from "./upload-image/upload-image.component";
import {UploadReceiptComponent} from "./upload-receipt/upload-receipt.component";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputNumberModule} from "primeng/inputnumber";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PanelModule} from "primeng/panel";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {AddPropertyComponent} from "./add-property.component";
import {StepsModule} from "primeng/steps";
import {SharedModule} from "../shared/shared.module";
import {StyleClassModule} from "primeng/styleclass";
import {KeyFilterModule} from "primeng/keyfilter";
import {DropdownModule} from "primeng/dropdown";
import { ValidationStepComponent } from './validation-step/validation-step.component';

@NgModule({
  declarations: [
    AddPropertyComponent,
    CharacteristicsComponent,
    UploadImageComponent,
    UploadReceiptComponent,
    ValidationStepComponent,

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
    FormsModule,
    StyleClassModule,
    KeyFilterModule,
    DropdownModule,
  ],
  providers: [ MessageService ]
})
export class AddPropertyModule { }
