import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.prod';

export interface CategoryMethod {
  sauce?: string;
  fillings?: string;
  method: string;
}

export interface MethodsByCategory {
  [key: string]: CategoryMethod;
}

@Injectable({
  providedIn: 'root',
})
export class MethodService {

  private apiUrl = environment.apiUrl + '/api/methods';

  private methodsSubject = new BehaviorSubject<MethodsByCategory>({});
  methods$ = this.methodsSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadAllMethods(): Observable<MethodsByCategory> {
    console.log('🔥 Service: Fetching from', this.apiUrl);

    return this.http.get<MethodsByCategory>(this.apiUrl).pipe(
      map(data => {
        console.log('✅ Service: API SUCCESS', data);
        this.methodsSubject.next(data);
        return data;
      }),
      catchError((error) => {
        console.error('❌ Service: API ERROR', error);
        console.error('Status:', error.status, 'Message:', error.message);
        return throwError(() => error);
      })
    );
  }

  getMethodByCategory(category: string): Observable<CategoryMethod> {
    return this.http.get<CategoryMethod>(`${this.apiUrl}/${category}`).pipe(
      catchError((error) => {
        console.error('❌ Single category error:', category, error);
        return throwError(() => error);
      })
    );
  }
}