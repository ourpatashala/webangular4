import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCalendarComponent } from './manage-calendar.component';

describe('ManageCalendarComponent', () => {
  let component: ManageCalendarComponent;
  let fixture: ComponentFixture<ManageCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
