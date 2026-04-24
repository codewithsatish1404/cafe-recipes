import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
BehaviorSubject,
map,
Observable,
catchError,
throwError
} from 'rxjs';

import { environment }
from '../../environments/environment.prod';

export interface CategoryMethod{
 sauce?:string;
 fillings?:string;
 method:string;
}

export interface MethodsByCategory{
 [key:string]:CategoryMethod;
}

@Injectable({
providedIn:'root'
})
export class MethodService {

private apiUrl =
environment.apiUrl +
'/api/methods';

private methodsSubject =
new BehaviorSubject<MethodsByCategory>({});

methods$ =
this.methodsSubject.asObservable();

constructor(
 private http:HttpClient
){}

loadAllMethods():
Observable<MethodsByCategory>{

return this.http
.get<MethodsByCategory>(
 this.apiUrl
)
.pipe(
 map(data=>{
   this.methodsSubject.next(data);
   return data;
 }),
 catchError(error=>{
   console.error(error);
   return throwError(
    ()=>error
   );
 })
);

}

getMethodByCategory(
 category:string
):Observable<CategoryMethod>{

return this.http
.get<CategoryMethod>(
 `${this.apiUrl}/${category}`
)
.pipe(
 catchError(error=>{
   console.error(error);
   return throwError(
    ()=>error
   );
 })
);

}

}