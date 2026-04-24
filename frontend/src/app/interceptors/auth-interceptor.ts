import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn =
(req, next) => {

const token =
localStorage.getItem('token');

let clonedReq = req.clone({
 withCredentials: true
});

if(token){
 clonedReq = req.clone({
   withCredentials:true,
   setHeaders:{
     Authorization:
      `Bearer ${token}`
   }
 });
}

return next(clonedReq);

};