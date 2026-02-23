import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { adminGuardGuard } from './admin-guard-guard';

describe('adminGuardGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
