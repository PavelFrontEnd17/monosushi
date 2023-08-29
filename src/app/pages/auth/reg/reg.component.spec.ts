import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegComponent } from './reg.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {Auth, AuthModule, getAuth, provideAuth} from "@angular/fire/auth";
import {FirebaseApp, initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../../environments/environment";
import {getStorage, provideStorage, Storage} from "@angular/fire/storage";
import {Firestore, getFirestore, provideFirestore} from "@angular/fire/firestore";
import {FormsModule, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {forwardRef} from "@angular/core";
import {AuthComponent} from "../auth.component";
import {IMaskModule} from "angular-imask";

describe('RegComponent', () => {
  let component: RegComponent;
  let fixture: ComponentFixture<RegComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegComponent,
      AuthComponent],
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        IMaskModule
      ],
      providers: [
        {provide: Auth, useValue: {} },
        {provide: Firestore, useValue: {} },

      ]
    });
    fixture = TestBed.createComponent(RegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be inited', () => {
    spyOn(component, 'initForm').and.callThrough()
    component.initForm()
    expect(component.initForm).toHaveBeenCalled()
    expect(component.regForm.value.fName).toBe(null)
    expect(component.regForm.value.sName).toBe(null)
    expect(component.regForm.value.phone).toBe(null)
    expect(component.regForm.value.email).toBe(null)
    expect(component.regForm.value.pass).toBe(null)
  });

  it('should check pass', () => {
    const FAKE_FORM = {
      fName: 'fname',
      sName: 'sname',
      phone: 'phone',
      email: 'email',
      pass: 'pass123'
    }
    component.initForm()
    component.regForm.patchValue({pass: FAKE_FORM.pass})
    component.passRepeat = 'pass123'
    spyOn(component, 'passwords').and.callThrough()
    component.passwords()
    expect(component.passwords).toHaveBeenCalled()
    expect(component.passNotPased).toBe(false)
    component.passRepeat = 'pass1234'
    component.passwords()
    expect(component.passwords).toHaveBeenCalled()
    expect(component.passNotPased).toBe(true)

  });
});
