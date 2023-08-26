import { CanActivateFn } from '@angular/router';

export const cabinetGuard: CanActivateFn = (route, state) => {
  return true;
};
