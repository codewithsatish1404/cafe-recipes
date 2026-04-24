import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.prod';

export interface User{
  _id?: string;   // changed from id -> _id to match backend
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn:'root'
})
export class AuthService {

private baseUrl =
  environment.apiUrl + '/api/auth';

private userSubject =
new BehaviorSubject<User | null>(null);

user$ = this.userSubject.asObservable();

constructor(
 private http:HttpClient
){}


// REGISTER
register(data:any){
 return this.http.post(
   `${this.baseUrl}/register`,
   data
 );
}


// LOGIN
login(data:any){
 return this.http.post<any>(
   `${this.baseUrl}/login`,
   data
 ).pipe(
   tap(res => {

     if(res?.token){
       localStorage.setItem(
         'token',
         res.token
       );
     }

     if(res?.user){
       this.userSubject.next(
         res.user
       );
     }

   })
 );
}


// LOGOUT
logout(){

localStorage.removeItem('token');

this.userSubject.next(null);

/*
Optional backend hit.
If you keep /logout route this calls it.
If backend is stateless JWT only,
you can remove the return and make
logout() void.
*/
return this.http.post(
 `${this.baseUrl}/logout`,
 {}
);

}


// CURRENT USER
getMe():Observable<User>{
 return this.http.get<User>(
   `${this.baseUrl}/me`
 );
}


// SESSION RESTORE
restoreSession(){

const token =
localStorage.getItem('token');

if(!token) return;

this.getMe().subscribe({
 next:user=>{
   this.setUser(user);
 },
 error:()=>{
   localStorage.removeItem(
    'token'
   );
   this.setUser(null);
 }
});

}


// HELPERS
setUser(
 user:User | null
){
 this.userSubject.next(user);
}

getUserValue(){
 return this.userSubject.value;
}

getToken(){
 return localStorage.getItem(
  'token'
 );
}

isLoggedIn(){
 return !!this.getToken();
}

isAdmin(){
 return (
  this.userSubject.value?.role
  === 'admin'
 );
}

}