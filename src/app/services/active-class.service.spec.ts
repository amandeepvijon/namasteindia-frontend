import { TestBed } from '@angular/core/testing';

import { ActiveClassService } from './active-class.service';

describe('ActiveClassService', () => {
  let service: ActiveClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
