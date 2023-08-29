import { Component } from '@angular/core';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {



  constructor(

  ){}


  ngOnInit(): void {
    this.getUser()
  }
  public curentUser = JSON.parse(localStorage.getItem('currentUser') as string)
  public orders = this.curentUser?.orders
  getUser(){
    this.curentUser = JSON.parse(localStorage.getItem('currentUser') as string)
    this.orders = this.curentUser?.orders

  }



}
