import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../core/services';
import { AuthResponse, Login, Register } from '../core/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  login(payload: Login): Observable<AuthResponse> {
    return this.post<AuthResponse>('auth/login', payload);
  }

  register(payload: Register): Observable<AuthResponse> {
    return this.post<AuthResponse>('auth/signup', payload);
  }
}
