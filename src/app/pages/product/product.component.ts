import { Component, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IProductResponse } from 'src/app/shared/interfaces/product/products.interfaces';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})



export class ProductComponent {
  public products!: IProductResponse[];
  public productsByCategory!: IProductResponse[]
  private eventSubscription!: Subscription
  public category!: string

 constructor(
  private data: ProductsService,
  private ActivatedRoute: ActivatedRoute,
  private router: Router,
  private header: HeaderComponent
 ){
  this.eventSubscription = this.router.events.subscribe(event => {
     if (event instanceof NavigationEnd) {
       this.getProducts()

     }
   })
 }

  
 getProducts(){
  this.category = this.ActivatedRoute.snapshot.paramMap.get('category') as string;
  console.log(this.category)
  this.data.getAllByCategory(this.category).subscribe(data => { this.products = data })
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {}
  
  Count(product: IProductResponse, value: boolean){
    if(!value && product.count > 1){
      product.count --
    }
    if(value&& product.count < 999){
      product.count++
    }
  }
  public busket: IProductResponse[] = JSON.parse(localStorage.getItem('basket') as string)
  addToBuscket(product:IProductResponse){
    this.busket = JSON.parse(localStorage.getItem('basket') as string)
    if(localStorage.length > 0 && this.busket.length != 0){
      this.busket = JSON.parse(localStorage.getItem('basket') as string)
      if(this.busket.some(prod => prod.id === product.id)){
        const index = this.busket.findIndex(prod => prod.id === product.id);
        this.busket[index].count += product.count;
      } else {
        this.busket?.push(product);
      }
    } else {  
      this.busket?.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(this.busket));
    this.header.getSum()
    product.count = 1;
  }
  
}
