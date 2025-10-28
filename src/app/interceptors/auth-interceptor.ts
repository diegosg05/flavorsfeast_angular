import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError(err => {
      if (err.status === 403) {
        authService.logout().subscribe({
          next: () => {
            authService.removeAuth();
            router.navigate(['/login']);
          }
        });
      }
      return throwError(() => err);
    })
  );
};
