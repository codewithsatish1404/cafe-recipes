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

private baseUrl=environment.apiUrl+'/api/auth';

private userSubject=
new BehaviorSubject<User|null>(null);

user$=this.userSubject.asObservable();

constructor(private http:HttpClient){
 this.restoreUser();
}


// SAFE RESTORE FIX
private restoreUser(){

 const storedUser=
 localStorage.getItem('user');

 if(
   !storedUser ||
   storedUser==='undefined' ||
   storedUser==='null'
 ){
   return;
 }

 try{
   const user=
   JSON.parse(storedUser);

   this.userSubject.next(user);

 }catch(error){

   console.error(
    'Invalid local user removed'
   );

   localStorage.removeItem('user');
   localStorage.removeItem('token');
 }
}


// LOGIN
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


// LOGOUT
logout(){

 localStorage.removeItem('token');
 localStorage.removeItem('user');

 this.userSubject.next(null);

 return this.http.post(
   `${this.baseUrl}/logout`,
   {}
 );
}

setUser(user:User|null){
 this.userSubject.next(user);
}

getUserValue(){
 return this.userSubject.value;
}

getToken(){
 return localStorage.getItem('token');
}

isLoggedIn(){
 return !!this.getToken();
}

isAdmin(){
 return this.userSubject.value?.role==='admin';
}

register(data:any){
 return this.http.post(
  `${this.baseUrl}/register`,
  data
 );
}

}