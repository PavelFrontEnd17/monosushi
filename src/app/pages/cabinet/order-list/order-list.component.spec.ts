import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListComponent } from './order-list.component';
import {IUpdate} from "../../../shared/interfaces/auth/auth.interfaces";

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderListComponent]
    });
    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get', () => {
    const FAKE_USER= {
      fName: 'name',
      sName: 'sname',
      pass: 'pass',
      email: 'email',
      role: 'USER',
      id: 1,
      orders: [{name: 'order1'},{name: 'order2'}]
    }
    localStorage.setItem('currentUser', JSON.stringify(FAKE_USER))
    spyOn(component, 'getUser').and.callThrough()
    component.getUser()
    expect(component.getUser).toHaveBeenCalled()
    expect(component.curentUser.fName).toBe(FAKE_USER.fName)
    expect(component.curentUser.sName).toBe(FAKE_USER.sName)
    expect(component.curentUser.email).toBe(FAKE_USER.email)
    expect(component.curentUser.pass).toBe(FAKE_USER.pass)
    expect(component.curentUser.id).toBe(FAKE_USER.id)
    expect(component.curentUser.role).toBe(FAKE_USER.role)
    expect(component.curentUser.orders[0].name).toBe(FAKE_USER.orders[0].name)
    expect(component.curentUser.orders[1].name).toBe(FAKE_USER.orders[1].name)
    expect(component.orders[0].name).toBe(FAKE_USER.orders[0].name)
    expect(component.orders[1].name).toBe(FAKE_USER.orders[1].name)
  });

});
