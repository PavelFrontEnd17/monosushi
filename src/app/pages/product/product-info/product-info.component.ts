import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product/products.interfaces';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {
  public product!: IProductResponse;
  private eventSubscription!: Subscription
  public id!: number
  constructor(
    private data: ProductsService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getProduct()

      }
    })
  }


  ngOnInit(): void {
    this.ActivatedRoute.data.subscribe(response => {
      this.product = response["productInfo"]
    })
  }
  getProduct() {
    this.id = parseInt(this.ActivatedRoute.snapshot.paramMap.get('id') as string);
    this.data.getById(this.id).subscribe(data => {
      this.product = data;
    })
  }


  Count(product: IProductResponse, value: boolean){
    if(!value && product.count >1){
      product.count --
    }
    if(value&& product.count <999){
      product.count++
    }
  }

  addToBuscket(product:IProductResponse){
    let busket: Array<IProductResponse> = []
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      busket = JSON.parse(localStorage.getItem('basket') as string);
      if(busket.some(prod => prod.id === product.id)){
        const index = busket.findIndex(prod => prod.id === product.id);
        busket[index].count += product.count;
      } else {
        busket.push(product);
      }
    } else {
      busket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(busket));
    product.count = 1;
  }
}
