import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisountsInfoComponent } from './disounts-info.component';

describe('DisountsInfoComponent', () => {
  let component: DisountsInfoComponent;
  let fixture: ComponentFixture<DisountsInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisountsInfoComponent]
    });
    fixture = TestBed.createComponent(DisountsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
