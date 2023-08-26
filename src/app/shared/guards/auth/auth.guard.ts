import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AdminAuthComponent } from 'src/app/pages/auth/admin-auth/admin-auth.component';
import { Observable } from 'rxjs';
import { ROLE } from '../../constansts/auth.constnts';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if(currentUser && currentUser.role === ROLE.ADMIN){
      return true;
    }
    this.router.navigate(['admin-auth']);
      return false;
  }

}
