import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoriesComponent } from './admin-categories.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {StorageModule} from "@angular/fire/storage";
import {FirebaseAppModule, initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";
import {ReactiveFormsModule} from "@angular/forms";
import {ICategoryResponse} from "../../shared/interfaces/category/categories.interfaces";
import {IProductResponse} from "../../shared/interfaces/product/products.interfaces";

describe('AdminCategoriesComponent', () => {
  let component: AdminCategoriesComponent;
  let fixture: ComponentFixture<AdminCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCategoriesComponent],
      imports: [
        HttpClientTestingModule,
        StorageModule,
        ReactiveFormsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),

      ]
    });
    fixture = TestBed.createComponent(AdminCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be start edited', () => {
  const FAKE_EDITED_CATEGORY: ICategoryResponse = {
    name: '',
    path: '',
    imgPath: '',
    id: 0
  }
    spyOn(component, "editCategory").and.callThrough()
    component.editCategory(FAKE_EDITED_CATEGORY)
    expect(component.editCategory).toHaveBeenCalled()
    expect(component.editStatus).toBe( true)
    expect(component.editId).toBe( 0)


  });

  it('should be inited', () => {
    spyOn(component, "initCategoryForm").and.callThrough()
    component.initCategoryForm()
    expect(component.initCategoryForm).toHaveBeenCalled()
    expect(component.categoryForm.get('name')?.value).toBe(null)
    expect(component.categoryForm.get('path')?.value).toBe(null)
    expect(component.categoryForm.get('imgPath')?.value).toBe(null)
  })


  it('should be controlled', () => {
    const FAKE_CONTROLLED_VALUE: ICategoryResponse = {
      name: '1212',
      path: '2323',
      imgPath: '3434',
      id: 12
    }

    component.initCategoryForm()
    component.categoryForm.patchValue({name: FAKE_CONTROLLED_VALUE.name})



    spyOn(component, "valueByControl").and.callThrough()
    component.valueByControl('name')
    expect(component.valueByControl).toHaveBeenCalled()
    expect(component.controlledValue).toBe( '1212')
    component.categoryForm.patchValue({path: FAKE_CONTROLLED_VALUE.path})
    component.valueByControl('path')
    expect(component.valueByControl).toHaveBeenCalled()
    expect(component.controlledValue).toBe( '2323')
    component.categoryForm.patchValue({imgPath: FAKE_CONTROLLED_VALUE.imgPath})
    component.valueByControl('imgPath')
    expect(component.valueByControl).toHaveBeenCalled()
    expect(component.controlledValue).toBe( '3434')
  })

});
