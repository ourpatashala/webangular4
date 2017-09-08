import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabServiceComponent } from './tab-service.component';

describe('TabServiceComponent', () => {
  let component: TabServiceComponent;
  let fixture: ComponentFixture<TabServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
