import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {IUpdate} from "../../../shared/interfaces/auth/auth.interfaces";

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule

      ]
    });
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    const FAKE_USER_SET: IUpdate = {
      id: 1,
      fName: 'name',
      sName: 'sname',
      role: 'USER',
      email: 'email',
      pass: 'pass'
    }
    localStorage.setItem('currentUser', JSON.stringify(FAKE_USER_SET))
    spyOn(component, 'getPerson').and.callThrough()
    component.getPerson()
    expect(component.getPerson).toHaveBeenCalled()
    expect(component.currentUser?.id).toBe(FAKE_USER_SET.id)
    expect(component.currentUser?.fName).toBe(FAKE_USER_SET.fName)
    expect(component.currentUser?.sName).toBe(FAKE_USER_SET.sName)
    expect(component.currentUser?.role).toBe(FAKE_USER_SET.role)
    expect(component.currentUser?.email).toBe(FAKE_USER_SET.email)
    expect(component.currentUser?.pass).toBe(FAKE_USER_SET.pass)
  })


  it('should be edited', () => {

     const FAKE_USER: IUpdate = {
      id: 1,
      fName: 'name',
      sName: 'sname',
      role: 'USER',
      email: 'email',
      pass: 'pass'
    }
    localStorage.setItem('currentUser', JSON.stringify(FAKE_USER))
    component.currentUser = FAKE_USER
    component.initForm()
    component.form.patchValue({name: 'qwerty'})
    component.form.patchValue({sName: 'asdfgh'})
    component.form.patchValue({email: '123@4.5'})
    spyOn(component, 'editData').and.callThrough()
    component.editData()
    expect(component.editData).toHaveBeenCalled()
    expect(component.currentUser.fName).toBe('qwerty')
    expect(component.currentUser.sName).toBe('asdfgh')
    expect(component.currentUser.email).toBe('123@4.5')
    const LOCAL_USER = JSON.parse(localStorage.getItem('currentUser') as string)
    expect(LOCAL_USER.fName).toBe('qwerty')
    expect(LOCAL_USER.sName).toBe('asdfgh')
    expect(LOCAL_USER.email).toBe('123@4.5')
  })

  });
