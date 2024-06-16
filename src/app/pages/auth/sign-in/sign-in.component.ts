import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Login } from '../../../core/interfaces';
import { AuthFacade } from '../../../facades/auth.facade';

@Component({
  selector: 'alte-sign-in',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  router: Router = inject(Router);

  authFacade: AuthFacade = inject(AuthFacade);

  login() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const payload: Login = this.form.value;

    this.authFacade.login(payload).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/main']);
    });
  }
}
