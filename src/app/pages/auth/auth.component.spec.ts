import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RegComponent} from "./reg/reg.component";
import {AdminAuthComponent} from "./admin-auth/admin-auth.component";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {Auth, AuthModule, getAuth, provideAuth} from "@angular/fire/auth";
import {FirebaseApp, FirebaseAppModule, initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {Firestore, getFirestore, provideFirestore} from "@angular/fire/firestore";
import {ReactiveFormsModule} from "@angular/forms";

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent,
      RegComponent,
      AdminAuthComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        ReactiveFormsModule,

      ],
      providers: [
        {provide: Firestore, useValue: {}},
        {provide: Auth, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
      ]
    });
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be false', () => {
    component.initForm()
    component.authForm.patchValue({email: '@@@@@'})
    component.authForm.patchValue({pass: '@@@@@'})
    spyOn(component, 'login').and.callThrough()
    component.login()
    expect(component.login).toHaveBeenCalled()
    expect(component.error).toBe(false)
  });
});
