import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = () => {

const auth = inject(AuthService);
const router = inject(Router);

// token exists = authenticated
if(auth.isLoggedIn()){
  return true;
}

router.navigate(['/login']);

return false;

};