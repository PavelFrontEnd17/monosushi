import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { environment } from 'src/environments/environment';
import { IDiscountRequest, IDiscountResponse } from '../../interfaces/discounts/discounts.intefaces';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {

  private url = environment.BACKEND_URL;
  private api = {
    discounts: `${this.url}/discounts`,
  }
  
  constructor(private http: HttpClient){}


  get(): Observable<IDiscountResponse[]> {
    return this.http.get<IDiscountResponse[]>(this.api.discounts)
  }

  getById(id: number){
    return this.http.get<IDiscountResponse>(`${this.api.discounts}/${id}`)
  }

  create(discount: IDiscountRequest): Observable<IDiscountResponse> {
    return this.http.post<IDiscountResponse>(this.api.discounts,discount)
  }

  update(discount: IDiscountRequest, id: number): Observable<IDiscountResponse> {
    return this.http.patch<IDiscountResponse>(`${this.api.discounts}/${id}`,discount)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.discounts}/${id}`)
  }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<IDiscountResponse>{
    return this.http.get<IDiscountResponse>(`${this.api.discounts}/${activatedRouteSnapshot.paramMap.get('id')}`)
  }
}
