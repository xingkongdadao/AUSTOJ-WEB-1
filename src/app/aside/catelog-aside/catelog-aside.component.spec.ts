import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatelogAsideComponent } from './catelog-aside.component';

describe('CatelogAsideComponent', () => {
  let component: CatelogAsideComponent;
  let fixture: ComponentFixture<CatelogAsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatelogAsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatelogAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
