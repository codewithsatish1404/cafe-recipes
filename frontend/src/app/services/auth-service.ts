import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment.prod';

export interface User{
 id?:string;
 name:string;
 email:string;
 role:string;
}

@Injectable({
 providedIn:'root'
})
export class AuthService{

private baseUrl=
environment.apiUrl+'/api/auth';

private userSubject=
new BehaviorSubject<User|null>(null);

user$=
this.userSubject.asObservable();

constructor(
 private http:HttpClient
){
 this.restoreUser(); // IMPORTANT
}


/* restore user on reload */
restoreUser(){
 const saved=
 localStorage.getItem('user');

 if(saved){
   this.userSubject.next(
    JSON.parse(saved)
   );
 }
}


register(data:any){
 return this.http.post(
  `${this.baseUrl}/register`,
  data
 );
}


login(data:any){
return this.http.post<any>(
 `${this.baseUrl}/login`,
 data
).pipe(
 tap(res=>{

  localStorage.setItem(
   'token',
   res.token
  );

  localStorage.setItem(
   'user',
   JSON.stringify(res.user)
  );

  this.userSubject.next(
   res.user
  );

 })
);
}


logout(){

localStorage.removeItem(
 'token'
);

localStorage.removeItem(
 'user'
);

this.userSubject.next(null);

return this.http.post(
`${this.baseUrl}/logout`,
{}
);

}


setUser(user:any){
 localStorage.setItem(
  'user',
  JSON.stringify(user)
 );
 this.userSubject.next(user);
}

getUserValue(){
 return this.userSubject.value;
}

isLoggedIn(){
 return !!this.userSubject.value;
}

isAdmin(){
 return this.userSubject.value?.role==='admin';
}

}