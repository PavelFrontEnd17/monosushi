import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { environment } from 'src/environments/environment';
import { IProductResponse, IProductRequest } from '../../interfaces/product/products.interfaces';

@Injectable({
  providedIn: 'root',


})


export class ProductsService {

  private url = environment.BACKEND_URL;
  private api = {
    products: `${this.url}/products`

  }
  constructor(
    private http: HttpClient,
    ){}

  get(): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(this.api.products)
  }
  getAllByCategory(name: string): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(`${this.api.products}?category=${name}`)
  }
  getByCategory(): Observable<IProductResponse[]> {
    let products = this.http.get<IProductResponse[]>(this.api.products)
    return products
  }
  getById(id:number):Observable<IProductResponse>{
    return this.http.get<IProductResponse>(`${this.api.products}/${id}`)
  }
  create(product: IProductRequest): Observable<IProductResponse> {
    return this.http.post<IProductResponse>(this.api.products, product)
  }

  update(product: IProductRequest, id: number): Observable<IProductResponse> {
    return this.http.patch<IProductResponse>(`${this.api.products}/${id}`, product)
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.products}/${id}`)
  }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot):Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${this.api.products}/${activatedRouteSnapshot.paramMap.get('id')}`)
  }



}
