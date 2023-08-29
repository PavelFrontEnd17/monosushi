import { Component, Injectable, SimpleChanges } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthComponent } from 'src/app/pages/auth/auth.component';
import { PhoningComponent } from 'src/app/pages/phoning/phoning.component';
import { ROLE,CABINET } from 'src/app/shared/constansts/auth.constnts';
import { IProductResponse } from 'src/app/shared/interfaces/product/products.interfaces';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

@Injectable({ providedIn: 'root' })

export class HeaderComponent {
  public IsLogin = false
  public userLogin = {}

  public busketCount = JSON.parse(localStorage.getItem('basket') as string)?.length
  public busket = false
  public body = document.querySelector('html')
  public busketItems: IProductResponse[] = []
  public sum: number = 0

  public loginUrl = ''
  public isLogin = false
  public cabinet = CABINET
  public adminUrl = ''

  constructor(
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.busketItems = JSON.parse(localStorage.getItem('basket') as string)
    this.change()
    this.getSum()
    this.checkUpdates()
    this.checkUserLogin()
  }

  change(): void {
    this.busketCount = JSON.parse(localStorage.getItem('basket') as string)?.length
  }

  Click() {
    this.change()
    this.getSum()
    this.busketItems = JSON.parse(localStorage.getItem('basket') as string)
    this.busket = !this.busket
    if(this.busket){
      this.body!.classList.add('overflow')
    }else{
      this.body!.classList.remove('overflow')
    }
  }

  // getInfo(){
  //   this.change()
  //   this.getSum()
  //   this.busketItems = JSON.parse(localStorage.getItem('basket') as string)
  // }

  Count(product:IProductResponse, value: boolean){
    if(!value && product.count > 1){
      product.count --
    }
    if(value&& product.count < 999){
      product.count++
    }
  }

  getSum(){

    this.sum = 0
    for(let i = 0; i < this.busketItems?.length; i++){
      this.sum = this.sum + this.busketItems[i]?.cost * this.busketItems[i]?.count
    }
    console.log(this.sum)
  }

  delProduct(product: IProductResponse){

    const index = this.busketItems.findIndex(prod => prod.id === product.id);
    this.busketItems.splice(index, 1)
    localStorage.setItem('basket', JSON.stringify(this.busketItems));
    console.log(localStorage.getItem('basket'))
    this.getSum()
    this.change()

  }

  startLogin(){
    this.dialog.open(AuthComponent, {
      panelClass: 'auth-dialog'
    })

  }


  tellMe(){
    this.dialog.open(PhoningComponent, {
      panelClass: 'phone-dialog'
    })
  }

  checkUserLogin(){
    console.log('aaasdasd')
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string)
    if(currentUser && currentUser.role === ROLE.ADMIN){
      this.loginUrl = 'cabinet'
      this.adminUrl = 'admin/'
      this.isLogin = true
      console.log("currentUser",currentUser)
    }else if(currentUser && currentUser.role === ROLE.USER){
      this.adminUrl = ''
      this.loginUrl = 'cabinet'
      this.isLogin = true
      console.log("currentUser",currentUser)

    }else{
      this.loginUrl = ''
      this.isLogin = false
      console.log('gggg')

    }

  }
  checkUpdates(){
    this.auth.isUserLogin$.subscribe( data =>{
      this.checkUserLogin()
    })
  }
  private cabinetIsOpen = false
  cabinetOpen(){
    this.cabinetIsOpen = !this.cabinetIsOpen
    if(this.cabinetIsOpen){
      document.querySelector('.cabinet-menu')?.classList.add('cabinet-open')
      document.querySelector('.cabinet-menu')?.classList.remove('cabinet-close')
    }else{
      document.querySelector('.cabinet-menu')?.classList.remove('cabinet-open')
      document.querySelector('.cabinet-menu')?.classList.add('cabinet-close')

    }

  }
  logOut(){
    this.loginUrl = ''
    this.isLogin = false
    localStorage.setItem('currentUser', JSON.stringify({}))
    this.router.navigate([''])

  }
}
