import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoComponent } from './product-info.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ActivatedRoute} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {IProductResponse} from "../../../shared/interfaces/product/products.interfaces";

describe('ProductInfoComponent', () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductInfoComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(ProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be calculate total price', () => {

    const FAKE_PRODUCT: IProductResponse = {
      id: 0,
      name: 'string',
      description: 'string',
      weight: 10,
      cost: 10,
      category: 'string',
      imgPath: 'string',
      count: 2,
      path: 'string'
    }
    component.product = FAKE_PRODUCT
    spyOn(component, "productPrice").and.callThrough()
    component.productPrice()
    expect(component.productPrice).toHaveBeenCalled()
    expect(component.price).toBe( 20)
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
  it('should be changed count', () => {
    const FAKE_PUSHED_PRODUCT: IProductResponse = {
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
    component.Count(FAKE_PUSHED_PRODUCT, true)
    expect(component.Count).toHaveBeenCalled()
    expect(FAKE_PUSHED_PRODUCT.count).toBe( 3)
    component.Count(FAKE_PUSHED_PRODUCT, false)
    expect(component.Count).toHaveBeenCalled()
    expect(FAKE_PUSHED_PRODUCT.count).toBe( 2)
  })
});
