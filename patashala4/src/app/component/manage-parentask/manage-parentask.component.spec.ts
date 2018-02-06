import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageParentaskComponent } from './manage-parentask.component';

describe('ManageParentaskComponent', () => {
  let component: ManageParentaskComponent;
  let fixture: ComponentFixture<ManageParentaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageParentaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageParentaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
