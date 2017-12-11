import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastersubjectComponent } from './mastersubject.component';

describe('MastersubjectComponent', () => {
  let component: MastersubjectComponent;
  let fixture: ComponentFixture<MastersubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastersubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastersubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
