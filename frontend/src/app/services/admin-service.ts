import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  
  private baseUrl = 'http://localhost:3000/api/recipes';


  constructor(private http: HttpClient) {}

  // ---------------- GET ALL ----------------
  getAllRecipes(paramsObj: any = {}): Observable<any> {
    let params = new HttpParams();

    Object.keys(paramsObj).forEach(key => {
      if (paramsObj[key] !== undefined && paramsObj[key] !== null) {
        params = params.set(key, paramsObj[key]);
      }
    });

    return this.http.get(this.baseUrl, { params });
  }

  // ---------------- GET BY ID ----------------
  getRecipeById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // ---------------- GET CATEGORIES ----------------
  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  // ---------------- CREATE ----------------
  createRecipe(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
  getRecipes(params: any = {}) {
  return this.http.get('http://localhost:3000/api/recipes', { params });
}


}
