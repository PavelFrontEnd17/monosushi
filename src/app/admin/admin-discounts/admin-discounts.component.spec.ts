import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscountsComponent } from './admin-discounts.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {StorageModule} from "@angular/fire/storage";
import {FirebaseApp, FirebaseAppModule, FirebaseApps, initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";
import {ReactiveFormsModule} from "@angular/forms";
import {ICategoryResponse} from "../../shared/interfaces/category/categories.interfaces";
import {IDiscountResponse} from "../../shared/interfaces/discounts/discounts.intefaces";

describe('AdminDiscountsComponent', () => {
  let component: AdminDiscountsComponent;
  let fixture: ComponentFixture<AdminDiscountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDiscountsComponent],
      imports: [
        HttpClientTestingModule,
        StorageModule,
        ReactiveFormsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),


      ]
    });
    fixture = TestBed.createComponent(AdminDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be start edited', () => {
    const FAKE_EDITED_DISCOUNT: IDiscountResponse = {
      name: 'string',
      description: 'string',
      imgPath: 'string',
      id: 12
    }
    spyOn(component, "editDiscount").and.callThrough()
    component.editDiscount(FAKE_EDITED_DISCOUNT)
    expect(component.editDiscount).toHaveBeenCalled()
    expect(component.editStatus).toBe( true)
    expect(component.editId).toBe( 12)


  });

  it('should be inited', () => {
    spyOn(component, "initDiscountForm").and.callThrough()
    component.initDiscountForm()
    expect(component.initDiscountForm).toHaveBeenCalled()
    expect(component.discountForm.get('name')?.value).toBe(null)
    expect(component.discountForm.get('description')?.value).toBe(null)
    expect(component.discountForm.get('imgPath')?.value).toBe(null)
  })

  it('should be controlled', () => {
    const FAKE_CONTRLLED_DISCOUNT: IDiscountResponse = {
      name: '1212',
      description: '2323',
      imgPath: '3434',
      id: 12
    }

    component.initDiscountForm()
    component.discountForm.patchValue({name: FAKE_CONTRLLED_DISCOUNT.name})
    spyOn(component, "valueByControl").and.callThrough()
    component.valueByControl('name')
    expect(component.valueByControl).toHaveBeenCalled()
    expect(component.valueByControl('name')).toBe( '1212')
    component.discountForm.patchValue({description: FAKE_CONTRLLED_DISCOUNT.description})
    component.valueByControl('description')
    expect(component.valueByControl).toHaveBeenCalled()
    expect(component.valueByControl('description')).toBe( '2323')
    component.discountForm.patchValue({imgPath: FAKE_CONTRLLED_DISCOUNT.imgPath})
    component.valueByControl('imgPath')
    expect(component.valueByControl).toHaveBeenCalled()
    expect(component.valueByControl('imgPath')).toBe( '3434')
  })





});
