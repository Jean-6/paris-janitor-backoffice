import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";
import {catchError, map, Subject, takeUntil, throwError} from "rxjs";
import {AlertService} from "../_services/alert.service";
import {RegisterRequest} from "../_dto/registerRequest";
import {RegisterResponse} from "../_dto/registerResponse";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {


  registerResponse: RegisterResponse | null = null;
  private destroy$: Subject<void> = new Subject<void>();
  myForm!: FormGroup;


  constructor(private formBuilder: FormBuilder,
              protected authService: AuthService,
              private router: Router,
              private alert: AlertService) {
  }

  ngOnInit() {

    this.myForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  onSubmit() {
    this.authService.isLoading = true;
    const registerRequest: RegisterRequest = {
      profileInfo: {
        username: this.myForm.value.username,
        role: 'USER',
        address: {
          street: '',
          city: '',
          zip: ''
        },
      },
      privateInfo: {
        email: this.myForm.value.email,
        password: this.myForm.value.password
      }

    }
    console.log(registerRequest)
    this.authService.register(registerRequest).pipe(
      catchError(error => {
        this.alert.error('Une erreur est survenue')
        return throwError(() => error)
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (res) => {
        this.registerResponse = res;
        console.log(this.registerResponse);
        this.router.navigate(['/dashboard']);
        this.alert.success('Ouverture de compte réussie');
      }, error: (err) => {
        this.authService.isLoading = true;
        this.router.navigate(['/login']);
        this.alert.error('Inscription échouée');
        console.error(`Erreur lors de l'inscription: `, err);
      },
      complete: () => {
        this.authService.isLoading=false;
      }

    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
