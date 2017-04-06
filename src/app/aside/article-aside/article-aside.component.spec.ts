import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAsideComponent } from './article-aside.component';

describe('ArticleAsideComponent', () => {
  let component: ArticleAsideComponent;
  let fixture: ComponentFixture<ArticleAsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleAsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
