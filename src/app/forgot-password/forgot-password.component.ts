import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordHandlerService} from "../_services/password-handler.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private passwordHandler: PasswordHandlerService) {

  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      email: ["", Validators.required],
    });
  }

  onSubmit() {
    this.passwordHandler.sendResetEmail(this.myForm.value.email).subscribe(
      (res:any) =>{
        alert('Email envoyé !')
      },
      (error)=>{
        console.log(error);
      }
    )
  }


}
