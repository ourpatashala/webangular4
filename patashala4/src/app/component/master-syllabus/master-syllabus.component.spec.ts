import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSyllabusComponent } from './master-syllabus.component';

describe('MasterSyllabusComponent', () => {
  let component: MasterSyllabusComponent;
  let fixture: ComponentFixture<MasterSyllabusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSyllabusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
