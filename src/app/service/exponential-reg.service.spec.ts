import { TestBed } from '@angular/core/testing';

import { ExponentialRegService } from './exponential-reg.service';

describe('ExponentialRegService', () => {
  let service: ExponentialRegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExponentialRegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
