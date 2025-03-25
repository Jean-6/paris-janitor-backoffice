import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PasswordHandlerService} from "../_services/password-handler.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{

  token: string ='';
  newPassword: string = '';
  myForm: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private passwordHandler: PasswordHandlerService) {
    this.myForm = this.formBuilder.group({
      newPassword: [''],

    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log("token recupéré: ",this.token);
    })
  }

  onSubmit() {
    console.log("token : "+this.token)
    this.passwordHandler.resetPassword(this.token,this.myForm.value.newPassword).subscribe(
      (res:any) => alert('Email envoyé !'),
      error=> console.log(error)
    )
  }

}
