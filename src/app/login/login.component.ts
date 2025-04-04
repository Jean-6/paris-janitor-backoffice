import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {AuthResponse} from "../_dto/authResponse";
import {catchError, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  authResponse: AuthResponse | null = null;
  isLoading: boolean = false;
  myForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {

  }


  ngOnInit() {
    this.myForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['', Validators.required],
    });

  }


  onSubmit() {
    this.authService.isLoading = true;
    this.authService.login(this.myForm.value.email,this.myForm.value.password).pipe(
      catchError((error)=>{
        console.error(`Erreur de connexion`,error);
        throw error;
      }),
      takeUntil(this.destroy$) // Nettoyage automatique si la composante est détruite
    ).subscribe({
      next: (res:any) => {
        this.authResponse = res;
        this.authService.setIsAuthenticated(true);
        this.router.navigate(['/dashboard']);
      },
      error: (err:any) => {
        console.error(`Erreur de connexion`, err);
        throw err;
      },
      complete: () => {
        this.authService.isLoading=false;
      }
      });

  }

  ngOnDestroy(){
    // Libérer les abonnements
    this.destroy$.next();
    this.destroy$.complete()
  }


}
