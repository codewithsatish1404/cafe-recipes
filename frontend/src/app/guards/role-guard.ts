import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const roleGuard: CanActivateFn = () => {

const auth = inject(AuthService);
const router = inject(Router);

const token = auth.getToken();

if(!token){
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