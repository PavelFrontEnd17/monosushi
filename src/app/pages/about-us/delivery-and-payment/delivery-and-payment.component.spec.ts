import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAndPaymentComponent } from './delivery-and-payment.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DeliveryAndPaymentComponent', () => {
  let component: DeliveryAndPaymentComponent;
  let fixture: ComponentFixture<DeliveryAndPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryAndPaymentComponent],
      imports: [
        HttpClientTestingModule
      ]
    });
    fixture = TestBed.createComponent(DeliveryAndPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
