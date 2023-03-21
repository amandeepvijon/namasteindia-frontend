import { TestBed } from '@angular/core/testing';

import { NgxwowserviceService } from './ngxwowservice.service';

describe('NgxwowserviceService', () => {
  let service: NgxwowserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxwowserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
