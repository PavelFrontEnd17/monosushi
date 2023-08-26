import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SushiesComponent } from './product.component';

describe('SushiesComponent', () => {
  let component: SushiesComponent;
  let fixture: ComponentFixture<SushiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SushiesComponent]
    });
    fixture = TestBed.createComponent(SushiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
