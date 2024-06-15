import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse, Login } from '../core/interfaces';
import { Observable } from 'rxjs';
import { ApiService } from '../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  httpClient: HttpClient = inject(HttpClient);

  login(payload: Login): Observable<AuthResponse> {
    return this.post('/auth/login', payload );
  }
}
