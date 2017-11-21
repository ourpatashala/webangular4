import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcampopupComponent } from './webcampopup.component';

describe('WebcampopupComponent', () => {
  let component: WebcampopupComponent;
  let fixture: ComponentFixture<WebcampopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebcampopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcampopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
