import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { clienteSoloLoginGuardGuard } from './cliente-solo-login-guard-guard';

describe('clienteSoloLoginGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => clienteSoloLoginGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
