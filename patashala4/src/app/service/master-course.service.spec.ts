import { TestBed, inject } from '@angular/core/testing';

import { MasterCourseService } from './master-course.service';

describe('MasterCourseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MasterCourseService]
    });
  });

  it('should be created', inject([MasterCourseService], (service: MasterCourseService) => {
    expect(service).toBeTruthy();
  }));
});
