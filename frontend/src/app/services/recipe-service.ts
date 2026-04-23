import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = environment.apiUrl + '/api/recipes';

  constructor(private http: HttpClient) {}

  // ---------------- GET RECIPES ----------------
  getRecipes(page = 1, limit = 12, search = '', category = ''): Observable<any> {
    let url = `${this.apiUrl}?page=${page}&limit=${limit}`;
    if (search) url += `&search=${search}`;
    if (category) url += `&category=${category}`;

    return this.http.get<any>(url).pipe(
      map((res: any) => ({
        ...res,
        data: res.data || res.recipes || []
      }))
    );
  }

  // ---------------- ADD ----------------
  addRecipe(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  // ---------------- DELETE ----------------
  deleteRecipe(params: any) {
    return this.http.delete(this.apiUrl, { params });
  }

  // ---------------- UPDATE ----------------
  updateRecipe(id: string, payload: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, payload);
  }
}