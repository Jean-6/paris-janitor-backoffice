import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {SignupComponent} from "./signup/signup.component";
import {AuthGuard} from "./_guards/auth.guard";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {UserComponent} from "./features/user/user.component";
import {ProfileComponent} from "./features/shared/profile/profile.component";
import {StatusChangeComponent} from "./features/status-change/status-change.component";
import {UploadProviderReceiptComponent} from "./features/status-change/upload-provider-receipt/upload-provider-receipt.component";
import {PropertyComponent} from "./features/shared/property/property.component";
import {PropertyDetailsComponent} from "./features/shared/property/property-details/property-details.component";
import {AddPropertyComponent} from "./features/add-property/add-property.component";
import {CharacteristicsComponent} from "./features/add-property/characteristics/characteristics.component";
import {UploadImageComponent} from "./features/add-property/upload-image/upload-image.component";

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
  {path : 'profile', component:ProfileComponent},
  {path : 'status-change', component:StatusChangeComponent},
  {path : 'properties', component:PropertyComponent},
  {path : 'property-details/:id', component:PropertyDetailsComponent},
  {path : 'property-adding', component:AddPropertyComponent},
  {path : 'characteristics', component:CharacteristicsComponent},
  {path : 'upload-images', component:UploadImageComponent},
  {path : 'upload-provider-receipts', component:UploadProviderReceiptComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
