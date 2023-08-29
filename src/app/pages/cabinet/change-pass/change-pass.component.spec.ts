import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassComponent } from './change-pass.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {IUpdate} from "../../../shared/interfaces/auth/auth.interfaces";

describe('ChangePassComponent', () => {
  let component: ChangePassComponent;
  let fixture: ComponentFixture<ChangePassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePassComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    });
    fixture = TestBed.createComponent(ChangePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    spyOn(component, 'initForm').and.callThrough()
    component.initForm()
    expect(component.initForm).toHaveBeenCalled()
    expect(component.passForm.value.oldPass).toBe(null)
    expect(component.passForm.value.newPass).toBe(null)
    expect(component.passForm.value.newPassRepeat).toBe(null)
  });
  it('should create', () => {
    const FAKE_USER: IUpdate = {
      id: 1,
      fName: 'name',
      sName: 'sname',
      role: 'USER',
      email: 'email',
      pass: 'pass'
    }
    localStorage.setItem('currentUser', JSON.stringify(FAKE_USER))
    spyOn(component, 'currentUser').and.callThrough()
    component.currentUser()
    expect(component.currentUser).toHaveBeenCalled()
    expect(component.curUser.id).toBe(FAKE_USER.id)
    expect(component.curUser.fName).toBe(FAKE_USER.fName)
    expect(component.curUser.sName).toBe(FAKE_USER.sName)
    expect(component.curUser.role).toBe(FAKE_USER.role)
    expect(component.curUser.email).toBe(FAKE_USER.email)
    expect(component.curUser.pass).toBe(FAKE_USER.pass)
  })


});
