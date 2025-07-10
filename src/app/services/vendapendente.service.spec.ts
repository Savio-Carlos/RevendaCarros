import { TestBed } from '@angular/core/testing';

import { VendapendenteService } from './vendapendente.service';

describe('VendapendenteService', () => {
  let service: VendapendenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendapendenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
