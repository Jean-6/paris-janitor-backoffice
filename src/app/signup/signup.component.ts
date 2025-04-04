import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginResponseDto} from "../_dto/loginResponseDto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";
import {catchError, map, Subject, takeUntil, throwError} from "rxjs";
import {AlertService} from "../_services/alert.service";
import {RegisterRequestDto} from "../_dto/registerRequestDto";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy{


  authResponse: LoginResponseDto | null = null;
  private destroy$: Subject<void> = new Subject<void>();
  myForm!: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit() {

    this.myForm = this.formBuilder.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
    });

  }


  onSubmit() {

  const registerRequest: RegisterRequestDto = this.myForm.value;
    this.authService.register(registerRequest).pipe(
      map(data => data.authResponse),
      catchError(error => {
        this.alertService.error('Une erreur est survenue')
        return throwError(() => error)
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (res) => {
        this.authResponse = res;
        console.log(this.authResponse);
        this.router.navigate(['/dashboard']);
      }, error: (err) => {
        console.error(`Erreur de connexion`, err);
      }

    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
