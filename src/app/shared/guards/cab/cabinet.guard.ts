import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AdminAuthComponent } from 'src/app/pages/auth/admin-auth/admin-auth.component';
import { Observable } from 'rxjs';
import { ROLE } from '../../constansts/auth.constnts';
import {HeaderComponent} from "../../../components/header/header.component";

@Injectable({
  providedIn: 'root'
})
export class CabinetGuard implements CanActivate {

  constructor(
    private router: Router,
    private header: HeaderComponent
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if(localStorage.getItem('currentUser') != '{}'){
      console.log('true ',currentUser )
      return true;
    }
    console.log('false ',currentUser )
    this.router.navigate(['']);
    this.header.startLogin()
    return false;
  }

}
