import { TestBed, inject } from '@angular/core/testing';

import { MasterSubjectService } from './master-subject.service';

describe('MasterSubjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MasterSubjectService]
    });
  });

  it('should be created', inject([MasterSubjectService], (service: MasterSubjectService) => {
    expect(service).toBeTruthy();
  }));
});
