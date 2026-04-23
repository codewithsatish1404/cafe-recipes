import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  // 🔐 Reactive user state
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  // 🔹 API Calls
  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data, {
      withCredentials: true
    });
  }

  logout() {
    return this.http.post(`${this.baseUrl}/logout`, {}, {
      withCredentials: true
    });
  }

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`, {
      withCredentials: true
    });
  }

  // 🔹 State Management
  setUser(user: User | null) {
    this.userSubject.next(user);
  }

  getUserValue(): User | null {
    return this.userSubject.value;
  }

  // 🔹 Helpers
  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  isAdmin(): boolean {
    return this.userSubject.value?.role === 'admin';
  }
}