import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes, withPreloading} from '@angular/router';
import {AdminComponent} from "./admin.component";
import {AuthGuard} from "../shared/guards/auth/auth.guard";
import {AdminCategoriesComponent} from "./admin-categories/admin-categories.component";
import {AdminDiscountsComponent} from "./admin-discounts/admin-discounts.component";
import {ProductsComponent} from "./products/products.component";

function redirect(){

}

const routes: Routes = [

{
  path: '', component: AdminComponent, children: [
    {path: 'category', component: AdminCategoriesComponent},
    {path: 'discounts', component: AdminDiscountsComponent},
    {path: 'products', component: ProductsComponent},
    {path: '', pathMatch: 'full', redirectTo: 'category'},

  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

