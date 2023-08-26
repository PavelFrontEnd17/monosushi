import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { DiscountsComponent } from './pages/about-us/discounts/discounts.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { DeliveryAndPaymentComponent } from './pages/about-us/delivery-and-payment/delivery-and-payment.component';
import { DisountsInfoComponent } from './pages/about-us/disounts-info/disounts-info.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminDiscountsComponent } from './admin/admin-discounts/admin-discounts.component';
import { ProductsComponent } from './admin/products/products.component';
import { ProductInfoComponent } from './pages/product/product-info/product-info.component';
import { ProductsService } from './shared/services/products/products.service';
import { DiscountsService } from './shared/services/discounts/discounts.service';
import { AuthGuard} from './shared/guards/auth/auth.guard';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { MainComponent } from './pages/cabinet/main/main.component';
import { OrderListComponent } from './pages/cabinet/order-list/order-list.component';
import { ChangePassComponent } from './pages/cabinet/change-pass/change-pass.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { getRedirectResult } from '@firebase/auth';
import { AdminAuthComponent } from './pages/auth/admin-auth/admin-auth.component';
import {CabinetGuard} from "./shared/guards/cab/cabinet.guard";
import { PhoningComponent } from './pages/phoning/phoning.component';


function redirect(){

}

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'check-out', component: CheckOutComponent},
  {
    path: 'product/:category',
    component: ProductComponent,
    loadChildren: () => import('./pages/product/product.module').then(m=> m.ProductModule)
  },
  {path: 'product/:category/:id', component: ProductInfoComponent, resolve:{
    productInfo: ProductsService
  }},
  {path: 'discounts/:id', component: DisountsInfoComponent, resolve:{
    discountInfo: DiscountsService
  }},
  {
    path: 'cabinet',
    canActivate: [CabinetGuard],
    loadChildren: () => import('./pages/cabinet/cabinet.module').then(m => m.CabinetModule)
  },
  {path: 'admin-auth', component: AdminAuthComponent},
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsModule)
  },

  {path: 'phoning', component: PhoningComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {
      preloadingStrategy:  PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
