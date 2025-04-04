import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {LoginResponseDto} from "../_dto/loginResponseDto";
import {catchError, Subject, takeUntil} from "rxjs";
import {AlertService} from "../_services/alert.service";
import {LoginRequestDto} from "../_dto/loginRequestDto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  authResponse: LoginResponseDto | null = null;
  myForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();


  constructor(private formBuilder: FormBuilder,
              protected authService: AuthService,
              private router: Router,
              private alert: AlertService) {

  }


  ngOnInit() {
    this.myForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['', Validators.required],
    });

  }


  onSubmit() {
    this.authService.isLoading = true;
    const loginRequest: LoginRequestDto = this.myForm.value;

    this.authService.login(loginRequest).pipe(
      catchError((error)=>{
        this.alert.error('Une erreur est survenue');
        console.error(`Erreur de connexion: `,error);
        throw error;
      }),
      takeUntil(this.destroy$) // Cancel observable during destroying component
    ).subscribe({
      next: (res:any) => {
        this.authResponse = res;
        this.authService.setIsAuthenticated(true);
        this.router.navigate(['/dashboard']);
      },
      error: (err:any) => {
        console.error(`Erreur de connexion: `, err);
      },
      complete: () => this.authService.isLoading=false
    });

  }

  ngOnDestroy(){
    // Release subscriptions
    this.destroy$.next();
    this.destroy$.complete()
  }


}
