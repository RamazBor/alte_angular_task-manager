import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse, Login } from '../core/interfaces';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../core/services/storage.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {

  authservice = inject(AuthService);
  storageService = inject(StorageService);
  router = inject(Router);

  httpClient: HttpClient = inject(HttpClient);

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
        const { accessToken, refreshToken } = res.token;
        const user = res.user;
        this.storageService.setItem('accessToken', accessToken);
        this.storageService.setItem('refreshToken', refreshToken);
        this.storageService.setItem('user', user);
      })
    );
  }

  logout() {
    this.storageService.clear();
    this.router.navigate(['/']);
  }
}
