import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategoryResponse, ICategoryRequire } from '../../interfaces/category/categories.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private url = environment.BACKEND_URL;
  private api = {
    categories: `${this.url}/categories`,
  }


  constructor(private http: HttpClient){}

  getCategories(): Observable<ICategoryResponse[]> {
    return this.http.get<ICategoryResponse[]>(this.api.categories)
  }


  create(category: ICategoryRequire): Observable<ICategoryResponse> {
    return this.http.post<ICategoryResponse>(this.api.categories, category)
  }

  update(category: ICategoryRequire, id: number): Observable<ICategoryResponse> {
    return this.http.patch<ICategoryResponse>(`${this.api.categories}/${id}`, category)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.categories}/${id}`)
  }


}
