import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {SignupComponent} from "./signup/signup.component";
import {AuthGuard} from "./_guards/auth.guard";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {PropertyComponent} from "./features/property/property.component";
import {DetailsComponent} from "./features/property/details/details.component";
import {AddPropertyComponent} from "./features/property/add-property/add-property.component";
import {UserComponent} from "./features/user/user.component";
import {UploadImageComponent} from "./features/property/add-property/upload-image/upload-image.component";
import {UploadReceiptComponent} from "./features/property/add-property/upload-receipt/upload-receipt.component";
import {CharacteristicsComponent} from "./features/property/add-property/characteristics/characteristics.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',//login
    pathMatch: 'full'
  },
  //Others root
  {
    path : 'signup',
    component:SignupComponent},
  {
    path : 'login',
    component:LoginComponent
  },
  {
    path : 'forgot-password',
    component:ForgotPasswordComponent
  },
  {
    path : 'reset-password',
    component:ResetPasswordComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    //canActivateChild: [AuthGuard]
  },
  {path : 'users', component:UserComponent},
  {path : 'properties', component:PropertyComponent},
  {path : 'property-details', component:DetailsComponent},
  {path : 'property-adding', component:AddPropertyComponent},
  {path : 'characteristics', component:CharacteristicsComponent},
  {path : 'upload-images', component:UploadImageComponent},
  {path : 'upload-receipts', component:UploadReceiptComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
