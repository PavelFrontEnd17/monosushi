import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes, withPreloading} from '@angular/router';
import {CabinetComponent} from "./cabinet.component";
import {ChangePassComponent} from "./change-pass/change-pass.component";
import {MainComponent} from "./main/main.component";
import {OrderListComponent} from "./order-list/order-list.component";


function redirect(){

}

const routes: Routes = [

  {
    path: '', component: CabinetComponent, children: [
      {path: 'change-pass', component: ChangePassComponent},
      {path: 'main', component: MainComponent},
      {path: 'order-list', component: OrderListComponent},
      {path: '', pathMatch: 'full', redirectTo: 'main'},

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }

