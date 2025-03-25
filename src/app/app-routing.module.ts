import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {SignupComponent} from "./signup/signup.component";
import {AuthGuard} from "./_guards/auth.guard";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
    path : 'dashboard',
    component:DashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
