import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordHandlerService} from "../_services/password-handler.service";
import {catchError, Subject, takeUntil} from "rxjs";
import {AlertService} from "../_services/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  myForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              protected passwordHandler: PasswordHandlerService,
              private alert: AlertService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      email: ["", [Validators.required,Validators.email]],
    });
  }

  onSubmit() {
    this.passwordHandler.isLoading=true;
    this.passwordHandler.sendResetEmail(this.myForm.value.email)
      .pipe(
        catchError((error)=>{
          this.alert.error('Erreur lors de l\'envoi d\'email')
          console.error("Erreur envoi email")
          throw error
        }),
        takeUntil(this.destroy$))
      .subscribe({
        next: (res:any) =>{
          this.router.navigate(['/login']);
          this.alert.success("Email envoyé")
        },
          error:(err:any)=>{
          this.alert.error('Erreur lors de l\'envoi d\'email')
            console.error(err);
            this.passwordHandler.isLoading= false;
          },
        complete: ()=>{
          this.passwordHandler.isLoading= false;
        }
      }
    )
  }


}
