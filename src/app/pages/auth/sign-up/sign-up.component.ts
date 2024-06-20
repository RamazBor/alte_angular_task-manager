import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AuthFacade } from '../../../facades';
import { Subject, catchError, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { Register } from '../../../core/interfaces';

@Component({
  selector: 'alte-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatLabel,
    MatOption,
    MatButtonModule,
  ],
})
export class SignUpComponent {
  form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  authFacade = inject(AuthFacade);
  sub$ = new Subject();
  router = inject(Router);

  signUp() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { firstName, lastName, email, password } = this.form.value as {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    };

    firstName.trim();
    lastName.trim();
    email.trim();
    password.trim();

    const payload: Register = {
      firstName,
      lastName,
      email,
      password,
    };
    this.authFacade
      .register(payload)
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        if (res) {
          setTimeout(() => {
            alert('Registered Successfully');
            this.router.navigate(['/']);
          }, 1000);
        }
      });
  }
}
