import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cabinetGuard } from './cabinet.guard';

describe('cabinetGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cabinetGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
