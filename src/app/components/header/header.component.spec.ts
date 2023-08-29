import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatTestDialogOpenerModule} from "@angular/material/dialog/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {IProductResponse} from "../../shared/interfaces/product/products.interfaces";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('it should change sum', () => {
    const FAKE_BUSKET: IProductResponse[] = [
      {
        id: 11,
        name: 'string',
        description: 'string',
        weight: 1,
        cost: 7,
        category: 'string',
        imgPath:' string',
        count: 1,
        path: 'string'
      },
      {
        id: 10,
        name: 'string',
        description: 'string',
        weight: 1,
        cost: 13,
        category: 'string',
        imgPath:' string',
        count: 1,
        path: 'string'
      }
    ]
    component.busketItems = FAKE_BUSKET
    spyOn(component, "getSum").and.callThrough()
    component.getSum()
    expect(component.getSum).toHaveBeenCalled()
    expect(component.sum).toBe( 20)

  });
  it('it should change count', () => {

  const FAKE_PRODUCT: IProductResponse =
    {
      id: 11,
      name: 'string',
      description: 'string',
      weight: 1,
      cost: 7,
      category: 'string',
      imgPath:' string',
      count: 2,
      path: 'string'
    }


    spyOn(component, "Count").and.callThrough()
    component.Count(FAKE_PRODUCT, false)
    expect(component.Count).toHaveBeenCalled()
    expect(FAKE_PRODUCT.count).toBe( 1)
    component.Count(FAKE_PRODUCT, true)
    expect(component.Count).toHaveBeenCalled()
    expect(FAKE_PRODUCT.count).toBe( 2)
  })


});
