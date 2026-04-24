import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment.prod';

export interface User {
 id?: string;
 name: string;
 email: string;
 role: string;
}

@Injectable({
 providedIn: 'root'
})
export class AuthService {

private baseUrl = environment.apiUrl + '/api/auth';

private userSubject =
 new BehaviorSubject<User | null>(null);

user$ = this.userSubject.asObservable();

constructor(private http: HttpClient) {
 this.restoreUser();
}

// ---------------- SAFE RESTORE ----------------
private restoreUser() {
 const storedUser = localStorage.getItem('user');

 if (!storedUser || storedUser === 'undefined' || storedUser === 'null') {
   this.userSubject.next(null);
   return;
 }

 try {
   const user: User = JSON.parse(storedUser);

   // normalize role (IMPORTANT FIX)
   if (user?.role) {
     user.role = user.role.toLowerCase();
   }

   this.userSubject.next(user);

 } catch (error) {
   console.error('Invalid user in localStorage removed');

   localStorage.removeItem('user');
   localStorage.removeItem('token');
   this.userSubject.next(null);
 }
}

// ---------------- LOGIN ----------------
login(data: any) {
 return this.http.post<any>(
   `${this.baseUrl}/login`,
   data
 ).pipe(
   tap(res => {

     localStorage.setItem('token', res.token);
     localStorage.setItem('user', JSON.stringify(res.user));

     const user = res.user;

     // normalize role
     if (user?.role) {
       user.role = user.role.toLowerCase();
     }

     this.userSubject.next(user);

   })
 );
}

// ---------------- LOGOUT ----------------
logout() {
 return this.http.post(
   `${this.baseUrl}/logout`,
   {}
 ).pipe(
   tap(() => {
     localStorage.removeItem('token');
     localStorage.removeItem('user');
     this.userSubject.next(null);
   })
 );
}

// ---------------- HELPERS ----------------
setUser(user: User | null) {
 this.userSubject.next(user);
}

getUserValue() {
 return this.userSubject.value;
}

getToken() {
 return localStorage.getItem('token');
}

isLoggedIn() {
 return !!this.getToken();
}

isAdmin() {
 return this.userSubject.value?.role === 'admin';
}

// ---------------- REGISTER ----------------
register(data: any) {
 return this.http.post(
   `${this.baseUrl}/register`,
   data
 );
}

}