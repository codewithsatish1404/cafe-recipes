import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const roleGuard: CanActivateFn = () => {

const auth = inject(AuthService);
const router = inject(Router);

if(!auth.isLoggedIn()){
 router.navigate(['/login']);
 return false;
}

const user = auth.getUserValue();

if(user?.role === 'admin'){
 return true;
}

router.navigate(['/access-denied']);
return false;

};