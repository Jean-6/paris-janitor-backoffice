import { Component } from '@angular/core';
import {AuthResponse} from "../_dto/authResponse";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  authResponse: AuthResponse | null = null;
  myForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.myForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      password: [''],
      //role: ['']
    });
  }

  ngOnInit() {

  }


  onSubmit() {
    console.log(this.myForm.value); // or handle the form submission as required
    console.log('Form submitted! : '+this.myForm.value.firstname + 'Email: ' + this.myForm.value.email + ', Password: ' + this.myForm.value.password);

    this.authService.register(this.myForm.value.firstname, this.myForm.value.lastname, this.myForm.value.email, this.myForm.value.password).subscribe(
      (res: any) => {
        this.authResponse = res;
        console.log(this.authResponse);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error(`Erreur de connexion`, error);
      }
    )

  }
}
