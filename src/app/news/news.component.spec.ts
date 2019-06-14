import { TestBed, async } from '@angular/core/testing';
import { NewsComponent } from './news.component';
import { NewsListComponent } from '../news-list/news-list.component';
import { NewsSearchComponent } from '../news-search/news-search.component';
import { NewsItemComponent } from '../news-item/news-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NewsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsComponent, NewsListComponent, NewsSearchComponent, NewsItemComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    }).compileComponents();
  }));

  describe(':', () => {
    function setup() {
      const fixture = TestBed.createComponent(NewsComponent);
      const app = fixture.debugElement.componentInstance;
      return { fixture, app };
    }
    it('should create the NewsComponent', () => {
      const { app, fixture } = setup();
      fixture.detectChanges(); /// (TypeError: Cannot read property 'unsubscribe' of undefined) without detect
      expect(app).toBeTruthy();
    });
  });
});
