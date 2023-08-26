import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoningComponent } from './phoning.component';

describe('PhoningComponent', () => {
  let component: PhoningComponent;
  let fixture: ComponentFixture<PhoningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhoningComponent]
    });
    fixture = TestBed.createComponent(PhoningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
