import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { map, catchError, of } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const auth = inject(AuthService);

  return auth.getMe().pipe(
    map(user => {
      if (user?.role === 'admin') {
        return true;
      }

      router.navigate(['/access-denied']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};