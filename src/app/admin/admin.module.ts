import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { SharedModule } from "../shared/shared.module";
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminDiscountsComponent } from './admin-discounts/admin-discounts.component';
import { ProductsComponent } from './products/products.component';



@NgModule({
  declarations: [
    AdminComponent,
    // AdminCategoriesComponent,
    // AdminDiscountsComponent,
    // ProductsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
