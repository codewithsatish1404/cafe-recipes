import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  private baseUrl = environment.apiUrl + '/api/recipes';

  constructor(private http: HttpClient) {}

  // ---------------- GET ALL ----------------
  getAllRecipes(paramsObj: any = {}): Observable<any> {
    let params = new HttpParams();

    Object.keys(paramsObj).forEach(key => {
      if (paramsObj[key] !== undefined && paramsObj[key] !== null) {
        params = params.set(key, paramsObj[key]);
      }
    });

    return this.http.get(this.baseUrl, {
      params,
      withCredentials: true   // ✅ FIX
    });
  }

  // ---------------- GET BY ID ----------------
  getRecipeById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, {
      withCredentials: true   // ✅ FIX
    });
  }

  // ---------------- GET CATEGORIES ----------------
  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`, {
      withCredentials: true   // ✅ FIX
    });
  }

  // ---------------- CREATE ----------------
  createRecipe(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data, {
      withCredentials: true   // ✅ FIX
    });
  }

  // ---------------- GET RECIPES ----------------
  getRecipes(params: any = {}): Observable<any> {
    return this.http.get(this.baseUrl, {
      params,
      withCredentials: true   // ✅ FIX
    });
  }
}