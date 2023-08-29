import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { CabinetGuard } from './cabinet.guard';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HeaderComponent} from "../../../components/header/header.component";
import {MatDialogModule} from "@angular/material/dialog";

// describe('cabinetGuard', () => {
//   let guard: CabinetGuard
//   const executeGuard: CanActivateFn = (...guardParameters) =>
//       TestBed.runInInjectionContext(() => guard(...guardParameters));

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//   });

//   it('should be created', () => {
//     expect(executeGuard).toBeTruthy();
//   });
// });

describe('cabinetGuard', () => {
  let guard: CabinetGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[
        HeaderComponent
      ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ]
    });
    guard = TestBed.inject(CabinetGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
