import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyllbusPopupComponent } from './syllbus-popup.component';

describe('SyllbusPopupComponent', () => {
  let component: SyllbusPopupComponent;
  let fixture: ComponentFixture<SyllbusPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyllbusPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyllbusPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
