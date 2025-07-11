import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, Subject, takeUntil} from "rxjs";
import {AuthService} from "../../../_services/auth.service";
import {AlertService} from "../../../_services/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit,OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  constructor(protected authService: AuthService,
              private alert: AlertService,
              private router: Router) {}

  ngOnInit(): void {}

  onLogout() {
    this.authService.logout()
      .pipe(
        catchError((err) =>{
          this.alert.error('Une erreur est survenue');
          this.router.navigate(['/login']);
          console.error(`Erreur de connexion: `,err);
          throw err;
        }),
        takeUntil(this.destroy$)
      ).subscribe({
      next: () => this.router.navigate(['/login']),
      complete: () => this.authService.isLoading=false
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
