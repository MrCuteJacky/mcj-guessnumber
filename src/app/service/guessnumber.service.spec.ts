import { TestBed } from '@angular/core/testing';

import { GuessnumberService } from './guessnumber.service';

describe('GuessnumberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuessnumberService = TestBed.get(GuessnumberService);
    expect(service).toBeTruthy();
  });
});
