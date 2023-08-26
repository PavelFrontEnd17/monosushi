import { Component } from '@angular/core';
import { IDiscountResponse } from 'src/app/shared/interfaces/discounts/discounts.intefaces';
import { DiscountsService } from 'src/app/shared/services/discounts/discounts.service';
@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent {
  public userDiscounts!: IDiscountResponse[];

  constructor(private discountService: DiscountsService){}

  ngOnInit(): void {
    this.getDiscounts();
  }

  getDiscounts(): void {
    this.discountService.get().subscribe(data =>{this.userDiscounts = data})
  }
}
