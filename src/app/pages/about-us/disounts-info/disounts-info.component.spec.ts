import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisountsInfoComponent } from './disounts-info.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('DisountsInfoComponent', () => {
  let component: DisountsInfoComponent;
  let fixture: ComponentFixture<DisountsInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisountsInfoComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule

      ]
    });
    fixture = TestBed.createComponent(DisountsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
