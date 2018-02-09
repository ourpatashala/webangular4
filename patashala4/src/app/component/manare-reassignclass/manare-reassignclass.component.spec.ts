import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManareReassignclassComponent } from './manare-reassignclass.component';

describe('ManareReassignclassComponent', () => {
  let component: ManareReassignclassComponent;
  let fixture: ComponentFixture<ManareReassignclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManareReassignclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManareReassignclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
