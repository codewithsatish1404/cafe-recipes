import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.prod';

export interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl = environment.apiUrl + '/api/auth';

  constructor(private http: HttpClient) {}

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  // REGISTER
  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // LOGIN (FIXED: auto load user after login)
  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.getMe().subscribe(user => {
          this.userSubject.next(user);
        });
      })
    );
  }

  // LOGOUT (FIXED: clear state)
  logout() {
    return this.http.post(`${this.baseUrl}/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => this.userSubject.next(null))
    );
  }

  // GET CURRENT USER
  getMe(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`, {
      withCredentials: true
    });
  }

  // STATE
  setUser(user: User | null) {
    this.userSubject.next(user);
  }

  getUserValue(): User | null {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  isAdmin(): boolean {
    return this.userSubject.value?.role === 'admin';
  }
}