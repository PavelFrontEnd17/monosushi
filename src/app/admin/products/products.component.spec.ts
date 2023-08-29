import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";

import {ReactiveFormsModule, Validators} from "@angular/forms";
import {Storage, StorageModule} from "@angular/fire/storage";
import {Firestore} from "@angular/fire/firestore";
import {Auth} from "@angular/fire/auth";
import {ICategoryResponse} from "../../shared/interfaces/category/categories.interfaces";
import {IDiscountResponse} from "../../shared/interfaces/discounts/discounts.intefaces";
import {IProductResponse} from "../../shared/interfaces/product/products.interfaces";

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        // provideFirebaseApp(() => initializeApp(environment.firebase)),
        // StorageModule
      ],
      providers: [
        {provide: Auth, useValue: {} },
        {provide: Storage, useValue: {} },
        {provide: Firestore, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be inited', () => {
    spyOn(component, "initProductForm").and.callThrough()
    component.initProductForm()
    expect(component.initProductForm).toHaveBeenCalled()
    expect(component.productForm.get('name')?.value).toBe(null)
    expect(component.productForm.get('weight')?.value).toBe(null)
    expect(component.productForm.get('cost')?.value).toBe(null)
    expect(component.productForm.get('category')?.value).toBe(null)
    expect(component.productForm.get('imgPath')?.value).toBe(null)
    expect(component.productForm.get('count')?.value).toBe(1)
  })

  it('should be added category', () => {
    const FAKE_CATEGORY: ICategoryResponse = {
      name: 'string',
      path: 'string',
      imgPath: 'string',
      id: 1
    }
    component.initProductForm()
    spyOn(component, "selectCategory").and.callThrough()
    component.selectCategory(FAKE_CATEGORY)
    expect(component.productForm.get('category')?.value).toBe(FAKE_CATEGORY)
  })
  it('should be controlled', () => {
    const FAKE_CONTROLLED_PRODUCT: IProductResponse = {
      id: 0,
      name: '1',
      description: '2',
      weight: 3,
      cost: 4,
      category: '5',
      imgPath: '6',
      count: 1,
      path: ''

    }

    component.initProductForm()

    component.productForm.patchValue({ name: FAKE_CONTROLLED_PRODUCT.name })
    spyOn(component, "valueByControl").and.callThrough()
    component.valueByControl('name')
    expect(component.valueByControl).toHaveBeenCalled()
    expect(component.valueByControl('name')).toBe( '1')

    component.productForm.patchValue({ description: FAKE_CONTROLLED_PRODUCT.description })
    component.valueByControl('description')
    expect(component.valueByControl).toHaveBeenCalled()
    expect(component.valueByControl('description')).toBe( '2')

    component.productForm.patchValue({ imgPath: FAKE_CONTROLLED_PRODUCT.imgPath })
    component.valueByControl('imgPath')
    expect(component.valueByControl).toHaveBeenCalled()
    expect(component.valueByControl('imgPath')).toBe( '6')

    component.productForm.patchValue({ weight: FAKE_CONTROLLED_PRODUCT.weight })
    component.valueByControl('weight')
    expect(component.valueByControl).toHaveBeenCalled()
    expect(component.valueByControl('weight').toString()).toBe( '3' )

    component.productForm.patchValue({ cost: FAKE_CONTROLLED_PRODUCT.cost })
    component.valueByControl('cost')
    expect(component.valueByControl).toHaveBeenCalled()
    expect(component.valueByControl('cost').toString()).toBe( '4')

    component.productForm.patchValue({ count: FAKE_CONTROLLED_PRODUCT.count })
    component.valueByControl('count')
    expect(component.valueByControl).toHaveBeenCalled()
    expect(component.valueByControl('count').toString()).toBe( '1')

  })

  it('should be start edited', () => {
    const FAKE_EDITED_PRODUCT: IProductResponse = {
      id: 12,
      name: '1',
      description: '2',
      weight: 3,
      cost: 4,
      category: '5',
      imgPath: '6',
      count: 1,
      path: ''

    }
    spyOn(component, "editProduct").and.callThrough()
    component.editProduct(FAKE_EDITED_PRODUCT)
    expect(component.editProduct).toHaveBeenCalled()
    expect(component.editStatus).toBe( true)
    expect(component.editId).toBe( 12)


  });

});
