import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes, withPreloading} from '@angular/router';
import { DiscountsService } from 'src/app/shared/services/discounts/discounts.service';
import { AboutUsComponent } from './about-us.component';
import { DeliveryAndPaymentComponent } from './delivery-and-payment/delivery-and-payment.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { DisountsInfoComponent } from './disounts-info/disounts-info.component';

function redirect(){

}

const routes: Routes = [
  {path: '', component: AboutUsComponent},
  {path: 'delivery-and-payment', component: DeliveryAndPaymentComponent},
  {path: 'discounts', component: DiscountsComponent, children: [
    {path: 'discounts/:id', component: DisountsInfoComponent, resolve:{
        discountInfo: DiscountsService
      }},
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutUsRoutingModule { }

