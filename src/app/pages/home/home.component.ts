import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { IProductRequest, IProductResponse } from 'src/app/shared/interfaces/product/products.interfaces';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { CategoriesService } from 'src/app/shared/services/caategories/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/categories.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public products!: IProductResponse[];
  public productsByCategory!: IProductResponse[]
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
