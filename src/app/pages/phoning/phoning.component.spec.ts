import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoningComponent } from './phoning.component';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IMaskModule} from "angular-imask";

describe('PhoningComponent', () => {
  let component: PhoningComponent;
  let fixture: ComponentFixture<PhoningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhoningComponent],
      imports: [
        ReactiveFormsModule,
        IMaskModule
      ]
    });
    fixture = TestBed.createComponent(PhoningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should console log', () => {
    spyOn(component, 'phoneMe').and.callThrough()
    component.phoneMe()
    expect(component.phoneMe).toHaveBeenCalled()
  });
});
