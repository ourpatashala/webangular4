import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassselectionPopupComponent } from './classselection-popup.component';

describe('ClassselectionPopupComponent', () => {
  let component: ClassselectionPopupComponent;
  let fixture: ComponentFixture<ClassselectionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassselectionPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassselectionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
