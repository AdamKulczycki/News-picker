import { TestBed, async } from '@angular/core/testing';
import { NewsComponent } from './news.component';
import { NewsListComponent } from '../news-list/news-list.component';
import { NewsSearchComponent } from '../news-search/news-search.component';
import { NewsItemComponent } from '../news-item/news-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ErrorPopupComponent } from '../error-popup/error-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsService } from '../services/news.service';
import { NewsPage } from '../models/newsPage.model';

describe('NewsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewsComponent,
        NewsListComponent,
        NewsSearchComponent,
        NewsItemComponent,
        ErrorPopupComponent
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [NewsService]
    }).compileComponents();
  }));

  describe(':', () => {
    function setup() {
      const fixture = TestBed.createComponent(NewsComponent);
      const component = fixture.debugElement.componentInstance;
      return { fixture, component };
    }
    it('should create the NewsComponent', () => {
      const { component, fixture } = setup();
      fixture.detectChanges(); /// (TypeError: Cannot read property 'unsubscribe' of undefined) without detect
      expect(component).toBeTruthy();
    });

    it('validity pending status and displaying loading icon ', () => {
      const { component, fixture } = setup();
      fixture.detectChanges();
      const newsService = fixture.debugElement.injector.get(NewsService);

      newsService.pendingStatus.next(true);
      expect(component.ifSearched).toBeTruthy();
      expect(component.pending).toBeTruthy();
      fixture.detectChanges();
      let loadingIcon = fixture.debugElement.nativeElement.querySelector(
        '.result-info--icon'
      );
      expect(loadingIcon).toBeTruthy();

      newsService.pendingStatus.next(false);
      expect(component.ifSearched).toBeTruthy();
      expect(component.pending).toBeFalsy();
      fixture.detectChanges();
      loadingIcon = fixture.debugElement.nativeElement.querySelector(
        '.result-info--icon'
      );
      expect(loadingIcon).toBeFalsy();
    });

    it('should set properly noResults flag', () => {
      const { component, fixture } = setup();
      fixture.detectChanges();
      const newsService = fixture.debugElement.injector.get(NewsService);

      const fakedEmptyNewsPage: NewsPage = {
        status: 'ok',
        totalResults: 0,
        articles: []
      };

      newsService.newsPage.next(fakedEmptyNewsPage);
      expect(component.noResults).toBeTruthy();

      const fakedNewsPage: NewsPage = {
        status: 'ok',
        totalResults: 0,
        articles: [
          {
            source: {
              id: '1',
              name: 'bbc'
            },
            author: 'John Doe',
            title: 'test title',
            description: 'test description',
            url: 'https://google.com',
            urlToImage:
              'https://splashbase.s3.amazonaws.com/unsplash/regular/tumblr_mopq69jlcS1st5lhmo1_1280.jpg',
            publishedAt: '2019-06-13T11:51:51Z',
            content: 'test contet'
          }
        ]
      };

      newsService.newsPage.next(fakedNewsPage);
      expect(component.noResults).toBeFalsy();
    });
  });
});
