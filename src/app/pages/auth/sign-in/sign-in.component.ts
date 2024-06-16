import { Component, OnDestroy, inject } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthFacade } from '../../../facades';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { Login } from '../../../core/interfaces';

@Component({
  selector: 'alte-sign-in',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnDestroy {
  myForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  authFacade = inject(AuthFacade);
  router = inject(Router);
  sub$ = new Subject();

  login() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.myForm.value as {
      email: string;
      password: string;
    };

    email.trim();
    password.trim();

    const payload: Login = {
      email,
      password,
    };

    this.authFacade
      .login(payload)
      .pipe(
        catchError((error) => {
          return throwError(() => error.message);
        })
      )
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        if (res) {
          alert('You are logged in successfully!');
          setTimeout(() => {
            this.router.navigate(['/home-page']);
          }, 1000);
        }
      });
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
