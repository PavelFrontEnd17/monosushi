import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes, withPreloading} from '@angular/router';
import {ProductComponent} from "./product.component";
import {ProductInfoComponent} from "./product-info/product-info.component";
import { ProductsService } from 'src/app/shared/services/products/products.service';


function redirect(){

}

const routes: Routes = [
  {
    path: '', component: ProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

