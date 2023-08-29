import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthComponent } from './admin-auth.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../../environments/environment";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {Firestore, getFirestore, provideFirestore} from "@angular/fire/firestore";
import {Auth, getAuth, provideAuth} from "@angular/fire/auth";
import {ReactiveFormsModule} from "@angular/forms";

describe('AdminAuthComponent', () => {
  let component: AdminAuthComponent;
  let fixture: ComponentFixture<AdminAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAuthComponent],
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        HttpClientTestingModule

      ],
      providers: [
        {provide: Firestore, useValue: {}},
        {provide: Auth, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
      ]
    });
    fixture = TestBed.createComponent(AdminAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inited', () => {
    const FAKE_CREDENTIAL = {
      email: '@@@@@@',
      pass: '@@@@@@'
    }
    spyOn(component, 'initForm').and.callThrough()
    component.initForm()
    expect(component.authForm.value.email).toBe(null)
    expect(component.authForm.value.pass).toBe(null)
    component.authForm.patchValue({email: FAKE_CREDENTIAL.email})
    component.authForm.patchValue({pass: FAKE_CREDENTIAL.pass})
    expect(component.authForm.value.email).toBe('@@@@@@')
    expect(component.authForm.value.pass).toBe('@@@@@@')

  });

  it('should inited', () => {
    const FAKE_CREDENTIAL = {
      email: '@@@@@@',
      pass: '@@@@@@'
    }
    component.initForm()
    component.authForm.patchValue({email: FAKE_CREDENTIAL.email})
    component.authForm.patchValue({pass: FAKE_CREDENTIAL.pass})
    expect(component.authForm.value.email).toBe('@@@@@@')
    expect(component.authForm.value.pass).toBe('@@@@@@')
    spyOn(component, 'login').and.callThrough()
    expect(component.error).toBe(false)

  });
});
