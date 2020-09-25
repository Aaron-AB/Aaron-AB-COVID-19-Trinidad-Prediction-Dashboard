import { TestBed } from '@angular/core/testing';

import { LinearRegService } from './linear-reg.service';

describe('LinearRegService', () => {
  let service: LinearRegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinearRegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
