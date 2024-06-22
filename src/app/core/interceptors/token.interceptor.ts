import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem('accessToken');
  console.log(accessToken);
  if (!accessToken) {
    return next(req);
  }
  return next(req.clone({
    headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
  }));
};
