import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {AuthResponse} from "../_dto/authResponse";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authResponse: AuthResponse | null = null;
  myForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.myForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }


  ngOnInit() {

  }


  onSubmit() {
    this.authService.login(this.myForm.value.email,this.myForm.value.password).subscribe(
      (res:any) =>{
        this.authResponse = res;
        console.log(this.authResponse);
        this.authService.setIsAuthenticated(true);
        this.router.navigate(['/dashboard']);
      },
      (error)=>{
        console.error(`Erreur de connexion`,error);
      }
    )

  }


}
