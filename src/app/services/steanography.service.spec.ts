import { TestBed } from '@angular/core/testing';

import { SteanographyService } from './steanography.service';

describe('SteanographyService', () => {
  let service: SteanographyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SteanographyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
