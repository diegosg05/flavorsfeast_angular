import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const checkoutGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const nav = router.currentNavigation();
  const from = nav?.extras.state?.['from'];

  if (from === 'cart' || from === 'reserve') {
    return true;
  }
  router.navigate(['/']);
  return false;
};
