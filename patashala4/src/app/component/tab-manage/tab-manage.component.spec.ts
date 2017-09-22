import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabManageComponent } from './tab-manage.component';

describe('TabManageComponent', () => {
  let component: TabManageComponent;
  let fixture: ComponentFixture<TabManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
