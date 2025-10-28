import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = localStorage.getItem("UATHDAT");
  if (user!!) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
