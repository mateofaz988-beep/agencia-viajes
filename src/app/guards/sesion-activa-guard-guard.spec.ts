import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { sesionActivaGuardGuard } from './sesion-activa-guard-guard';

describe('sesionActivaGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => sesionActivaGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
