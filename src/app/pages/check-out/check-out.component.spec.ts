import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutComponent } from './check-out.component';
import {FirebaseAppModule} from "@angular/fire/app";
import {ReactiveFormsModule} from "@angular/forms";
import {Storage} from "@angular/fire/storage";
import {Firestore} from "@angular/fire/firestore";
import {RouterTestingModule} from "@angular/router/testing";
import {Auth} from "@angular/fire/auth";
import {MatDialogRef} from "@angular/material/dialog";
import {IMaskModule} from "angular-imask";
import {IProductResponse} from "../../shared/interfaces/product/products.interfaces";


describe('CheckOutComponent', () => {
  let component: CheckOutComponent;
  let fixture: ComponentFixture<CheckOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckOutComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        IMaskModule
      ],
      providers: [
        {provide: Firestore, useValue: {}},
        {provide: Auth, useValue: {}},
        {provide: MatDialogRef, useValue: {}},

      ]

    });
    fixture = TestBed.createComponent(CheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add cutlery', () => {

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

  it('should count cutlery', () => {
    component.initForm()
    component.checkOutForm.patchValue({cutlery: 7})
    expect(component.checkOutForm.value.cutlery).toBe(7)
    component.sum = 10
    spyOn(component, 'addCutleryCost').and.callThrough()
    component.addCutleryCost()
    expect(component.addCutleryCost).toHaveBeenCalled()
    expect(component.total).toBe(40)


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
    expect(component.busketItems[0].id).toBe( 11)
    spyOn(component, "delProduct").and.callThrough()
    component.delProduct(FAKE_BUSKET[0])
    expect(component.delProduct).toHaveBeenCalled()
    expect(component.busketItems[0].id).toBe( 10)
    const FAKE_BASKET2: IProductResponse[] = []
    localStorage.setItem('basket', JSON.stringify(FAKE_BASKET2))
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


  it('should change value', () => {
    spyOn(component, "commenting").and.callThrough()
    component.commenting()
    expect(component.commenting).toHaveBeenCalled()
    expect(component.startComment).toBe( true)
  })

  it('should change cook comment value', () => {
    spyOn(component, "cookCommenting").and.callThrough()
    component.cookCommenting()
    expect(component.cookCommenting).toHaveBeenCalled()
    expect(component.startComCook).toBe( true)
  })
});
