import { TestBed } from '@angular/core/testing';

import { DisplayserviceService } from './displayservice.service';

describe('DisplayserviceService', () => {
  let service: DisplayserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
