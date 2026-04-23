import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RecipeApiResponse } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
 
 private apiUrl = 'http://localhost:3000/api/recipes';

  constructor(private http: HttpClient) {}
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

 addRecipe(data: any) {
  return this.http.post('http://localhost:3000/api/recipes', data);
}

 deleteRecipe(params: any) {
  return this.http.delete('http://localhost:3000/api/recipes', { params });
}
updateRecipe(id: string, payload: any) {
  return this.http.put<any>(`${this.apiUrl}/${id}`, payload);
}

}