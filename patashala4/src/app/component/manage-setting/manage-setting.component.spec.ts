import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSettingComponent } from './manage-setting.component';

describe('ManageSettingComponent', () => {
  let component: ManageSettingComponent;
  let fixture: ComponentFixture<ManageSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
