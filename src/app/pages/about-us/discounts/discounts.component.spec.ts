import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountsComponent } from './discounts.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {IDiscountResponse} from "../../../shared/interfaces/discounts/discounts.intefaces";
import {DiscountsService} from "../../../shared/services/discounts/discounts.service";

describe('DiscountsComponent', () => {
  let component: DiscountsComponent;
  let fixture: ComponentFixture<DiscountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(DiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
