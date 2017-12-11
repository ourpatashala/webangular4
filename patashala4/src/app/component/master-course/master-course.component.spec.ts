import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCourseComponent } from './master-course.component';

describe('MasterCourseComponent', () => {
  let component: MasterCourseComponent;
  let fixture: ComponentFixture<MasterCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
