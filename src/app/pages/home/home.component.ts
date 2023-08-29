import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import {IProductResponse} from "../../shared/interfaces/product/products.interfaces";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public products!: IProductResponse[];
 constructor(
  private prodData: ProductsService
 ){}
 ngOnInit() {
  this.getProducts()

 }
 getProducts(){
      this.prodData.getByCategory().subscribe( data => {
        this.products = data.filter(product => product.category == 'rolls')
      })
      console.log(this.products)
  }


}
