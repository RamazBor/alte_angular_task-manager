import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../core/services/storage.service';
import { Observable, tap } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { AuthResponse, Login } from '../core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {

  authservice = inject(AuthService);
  storageService = inject(StorageService);
  router = inject(Router);


  get accessToken(): string {
    return this.storageService.getItem('accessToken');
  }

  get refreshToken() {
    return this.storageService.getItem('refreshToken');
  }

  get user() {
    return this.storageService.getItem('user');
  }

  login(payload: Login): Observable<AuthResponse> {
    return this.authservice.login(payload).pipe(
      tap((res) => {
        console.log(res);
        const { accessToken, refreshToken } = res.token;
        const user = res.user;
        this.storageService.setItem('accessToken', accessToken);
        this.storageService.setItem('refreshToken', refreshToken);
        this.storageService.setItem('user', user);
      })
    );
  }
}

