import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteStatComponent } from './site-stat.component';

describe('SiteStatComponent', () => {
  let component: SiteStatComponent;
  let fixture: ComponentFixture<SiteStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
