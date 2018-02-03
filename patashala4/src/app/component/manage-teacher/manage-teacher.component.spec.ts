import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTeacherComponent } from './manage-teacher.component';

describe('ManageTeacherComponent', () => {
  let component: ManageTeacherComponent;
  let fixture: ComponentFixture<ManageTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
