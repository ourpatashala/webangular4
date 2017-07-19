/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SchoolService } from './school.service';

describe('SchoolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolService]
    });
  });

  it('should ...', inject([SchoolService], (service: SchoolService) => {
    expect(service).toBeTruthy();
  }));
});
