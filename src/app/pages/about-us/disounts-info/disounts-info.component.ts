import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IDiscountResponse } from 'src/app/shared/interfaces/discounts/discounts.intefaces';
import { DiscountsService } from 'src/app/shared/services/discounts/discounts.service';

@Component({
  selector: 'app-disounts-info',
  templateUrl: './disounts-info.component.html',
  styleUrls: ['./disounts-info.component.scss']
})
export class DisountsInfoComponent implements OnInit{
  public eventSubscription
  public discount!: IDiscountResponse;
  constructor( 
    private data: DiscountsService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router
    ){
      this.eventSubscription = this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.getDiscount()
  
        }
      })
    }

    

    ngOnInit(): void {
      this.ActivatedRoute.data.subscribe(response => {
        this.discount = response["discountInfo"]
      })
    }

    getDiscount(){
      let id = parseInt(this.ActivatedRoute.snapshot.paramMap.get('id') as string);
      this.data.getById(id).subscribe(data => {
        this.discount = data;
      })
    }
}
