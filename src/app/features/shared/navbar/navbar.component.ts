import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../_services/auth.service";
import {catchError, Subject, takeUntil} from "rxjs";
import {AlertService} from "../../../_services/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy{

  private destroy$: Subject<void> = new Subject<void>();

  constructor(protected authService: AuthService,
              private alert: AlertService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.authService.logout()
      .pipe(
        catchError((err) =>{
          this.alert.error('Une erreur est survenue');
          console.error(`Erreur de connexion: `,err);
          throw err;
        }),
        takeUntil(this.destroy$)
      ).subscribe({
      next: (res:any) => {

        this.router.navigate(['/login'])
      },
      error: (err:any) => {},
      complete: () => this.authService.isLoading=false
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



}
