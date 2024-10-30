import { TestBed } from '@angular/core/testing';

import { VcontestService } from './vcontest.service';

describe('VcontestService', () => {
  let service: VcontestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VcontestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
