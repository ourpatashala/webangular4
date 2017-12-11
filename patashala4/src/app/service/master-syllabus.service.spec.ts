import { TestBed, inject } from '@angular/core/testing';

import { MasterSyllabusService } from './master-syllabus.service';

describe('MasterSyllabusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MasterSyllabusService]
    });
  });

  it('should be created', inject([MasterSyllabusService], (service: MasterSyllabusService) => {
    expect(service).toBeTruthy();
  }));
});
