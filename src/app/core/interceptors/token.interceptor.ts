import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthFacade } from '../../facades';
import { catchError, mergeMap, Observable, throwError } from 'rxjs';
import { AuthService } from '../../services';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<any> => {
  const authFacde: AuthFacade = inject(AuthFacade);
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const accessToken = authFacde.accessToken as string;
  const refreshToken = authFacde.refreshToken;

  console.log(accessToken);
  if (!accessToken) {
    return next(req);
  }
  return next(
    req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    })
  ).pipe(
    catchError((err): any => {
      if (err.status === 401) {
        return authService.token(refreshToken).pipe(
          mergeMap((res: any) => {
            console.log(res);
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            return next(
              req.clone({
                headers: req.headers.set(
                  'Authorization',
                  `Bearer ${res.accessToken}`
                ),
              })
            );
          }),
          catchError((err) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');

            router.navigate(['/']);

            return throwError(() => err);
          })
        );
      }
    })
  );
};
