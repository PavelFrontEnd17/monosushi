import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {IProductResponse} from "../../shared/interfaces/product/products.interfaces";

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule
      ]
    });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be changed count', () => {
    const FAKE_PRODUCT: IProductResponse = {
      id: 12,
      name: 'string',
      description: 'string',
      weight: 10,
      cost: 10,
      category: 'string',
      imgPath: 'string',
      count: 2,
      path: 'string'
    }
    spyOn(component, "Count").and.callThrough()
    component.Count(FAKE_PRODUCT, true)
    expect(component.Count).toHaveBeenCalled()
    expect(FAKE_PRODUCT.count).toBe( 3)
    component.Count(FAKE_PRODUCT, false)
    expect(component.Count).toHaveBeenCalled()
    expect(FAKE_PRODUCT.count).toBe( 2)
  })

  it('should be pushed', () => {
    const FAKE_PRODUCT: IProductResponse = {
      id: 12,
      name: 'string',
      description: 'string',
      weight: 10,
      cost: 10,
      category: 'string',
      imgPath: 'string',
      count: 2,
      path: 'string'
    }
    spyOn(component, "addToBuscket").and.callThrough()
    component.addToBuscket(FAKE_PRODUCT)
    expect(component.addToBuscket).toHaveBeenCalled()
    expect(FAKE_PRODUCT.count).toBe( 1)
    const FAKE_BASKET: IProductResponse[] = []
    FAKE_BASKET.push(FAKE_PRODUCT)
    const FAKE_LOCAL_BASKET = JSON.parse( localStorage.getItem('basket') as string)
    expect(FAKE_LOCAL_BASKET[0].id).toBe(12)
    const FAKE_BASKET2: IProductResponse[] = []
    localStorage.setItem('basket', JSON.stringify(FAKE_BASKET2))

  })



});
