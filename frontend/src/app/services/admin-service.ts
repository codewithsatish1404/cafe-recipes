import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
providedIn:'root'
})
export class AdminService {

private baseUrl = environment.apiUrl + '/api/recipes';

constructor(private http: HttpClient) {}

getAllRecipes(paramsObj:any={}):Observable<any>{

let params = new HttpParams();

Object.keys(paramsObj).forEach(key=>{
 if(
   paramsObj[key] !== undefined &&
   paramsObj[key] !== null
 ){
   params=params.set(key,paramsObj[key]);
 }
});

return this.http.get(
 this.baseUrl,
 { params }
);

}

getRecipeById(id:string):Observable<any>{
 return this.http.get(
  `${this.baseUrl}/${id}`
 );
}

getCategories():Observable<any>{
 return this.http.get(
  `${this.baseUrl}/categories`
 );
}

createRecipe(data:any):Observable<any>{
 return this.http.post(
  this.baseUrl,
  data
 );
}

getRecipes(params:any={}):Observable<any>{
 return this.http.get(
  this.baseUrl,
  { params }
 );
}

}