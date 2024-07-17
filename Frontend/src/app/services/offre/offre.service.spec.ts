import { TestBed } from '@angular/core/testing';

import { OffresService } from './offre.service';

describe('OffreService', () => {
  let service: OffresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
