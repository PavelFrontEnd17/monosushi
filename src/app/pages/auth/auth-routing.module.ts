import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes, withPreloading} from '@angular/router';
import {AuthComponent} from "./auth.component";
import {ChangePassComponent} from "../cabinet/change-pass/change-pass.component";
import {MainComponent} from "../cabinet/main/main.component";
import {OrderListComponent} from "../cabinet/order-list/order-list.component";
import {AdminAuthComponent} from "./admin-auth/admin-auth.component";
import {RegComponent} from "./reg/reg.component";


function redirect(){

}

const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      {path: 'admin', component: AdminAuthComponent},
      {path: 'register', component: RegComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

