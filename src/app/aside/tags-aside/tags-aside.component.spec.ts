import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsAsideComponent } from './tags-aside.component';

describe('TagsAsideComponent', () => {
  let component: TagsAsideComponent;
  let fixture: ComponentFixture<TagsAsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsAsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
