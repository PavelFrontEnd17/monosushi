import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductComponent} from "./product.component";
import {ProductInfoComponent} from "./product-info/product-info.component";
import {SharedModule} from "../../shared/shared.module";
import { ProductRoutingModule } from './prouct-routing.module';



@NgModule({
  declarations: [
    ProductComponent,
    ProductInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
