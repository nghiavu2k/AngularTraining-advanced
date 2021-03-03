import { TestBed } from '@angular/core/testing';

import { UnSavedChangesGuard } from './un-saved-changes.guard';

describe('UnSavedChangesGuard', () => {
  let guard: UnSavedChangesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnSavedChangesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
