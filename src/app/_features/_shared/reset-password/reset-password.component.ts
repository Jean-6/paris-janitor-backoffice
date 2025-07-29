import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PasswordHandlerService} from "../../../_services/password-handler.service";
import {ResetPassRequest} from "../../../_dto/resetPassRequest";
import {catchError, finalize, Subject, takeUntil} from "rxjs";
import {AlertService} from "../../../_services/alert.service";


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  token: string = '';

  myForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              protected passwordHandler: PasswordHandlerService,
              private alert: AlertService) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log("token recupéré: ", this.token);
    })
    this.myForm = this.formBuilder.group({
        newPassword1: ['', Validators.required],
        newPassword2: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator
      });
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {

    const newPassword1 = form.get('newPassword1')?.value;
    const newPassword2 = form.get('newPassword2')?.value;

    if (newPassword1 !== newPassword2) {
      return {passwordsMismatch: true};
    }
    return null;
  }

  onSubmit() {

    this.passwordHandler.isLoading = true;
    const resetPasswordRequest: ResetPassRequest = {
      token: this.token,
      newPassword: this.myForm.value.newPassword1
    }

    this.passwordHandler.resetPassword(resetPasswordRequest)
      .pipe(
        catchError((err) => {
          this.alert.error("Une erreur est survenue")
          console.error('Erreur de connexion: ', err)
          throw err;
        }),
        takeUntil(this.destroy$),
        finalize(()=>{
          this.passwordHandler.isLoading = false;
        })
      ).subscribe({
        next: (res: any) => {
          this.alert.success(res.toString())
          this.router.navigate(['/login'])
          this.alert.success('Mise à jour du mot de passe réussie');
        },
        error: (err: any) => {
          console.error('Erreur de connexion');
          this.router.navigate(['/reset-password']);
          this.alert.error('Erreur lors de la réinitialisation');
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
