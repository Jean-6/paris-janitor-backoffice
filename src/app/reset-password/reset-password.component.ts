import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PasswordHandlerService} from "../_services/password-handler.service";
import {ResetPasswordRequestDto} from "../_dto/resetPasswordRequestDto";
import {catchError, Subject, takeUntil} from "rxjs";
import {AlertService} from "../_services/alert.service";


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit,OnDestroy{

  token: string ='';

  myForm!: FormGroup ;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private passwordHandler: PasswordHandlerService,
              private alert: AlertService) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log("token recupéré: ",this.token);
    })
    this.myForm = this.formBuilder.group({
      newPassword: ['',Validators.required],
    });
  }

  onSubmit() {
    const resetPasswordRequest= new ResetPasswordRequestDto(this.token, this.myForm.value);
    this.passwordHandler.resetPassword(resetPasswordRequest)
      .pipe(
        catchError((err)=>{
          this.alert.error("Une erreur est survenue")
          console.error('Erreur de connexion: ',err)
          throw err;
        }),
        takeUntil(this.destroy$)
      ).subscribe({
        next: (res:any)=>{
          this.alert.success(res.toString())
          this.router.navigate(['/login'])
        },
        error: (err:any)=>{
          console.error('Erreur de connexion');
        },
        complete: ()=> console.log('Requête terminée'),
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
