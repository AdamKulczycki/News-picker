import { async, TestBed } from '@angular/core/testing';

import { NewsListComponent } from './news-list.component';
import { NewsItemComponent } from '../news-item/news-item.component';
import { NewsService } from '../services/news.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewsPage } from '../models/newsPage.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewsListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsListComponent, NewsItemComponent],
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      providers: [NewsService]
    }).compileComponents();
  }));

  describe(':', () => {
    function setup() {
      const fixture = TestBed.createComponent(NewsListComponent);
      const component = fixture.debugElement.componentInstance;
      return { fixture, component };
    }

    it('should create the NewsComponent', () => {
      const { fixture, component } = setup();
      fixture.detectChanges(); /// (TypeError: Cannot read property 'unsubscribe' of undefined) without detect
      expect(component).toBeTruthy();
    });

    it('should return false to avaiable next and prev page', () => {
      const { fixture, component } = setup();
      const newsService = fixture.debugElement.injector.get(NewsService);
      spyOn(newsService, 'isLastPage').and.returnValue(true);
      fixture.detectChanges();
      expect(component.isNextAvaiable()).toBeFalsy();

      spyOn(newsService, 'isFirstPage').and.returnValue(true);
      fixture.detectChanges();
      expect(component.isPreviousAvaiable()).toBeFalsy();
    });

    it('should disabled nav buttons if no news', () => {
      const fakedNewsList = [{}]; // only to set length of array to more than 0
      const { fixture, component } = setup();
      fixture.debugElement.injector.get(NewsService);
      spyOn(component, 'isNextAvaiable').and.returnValue(false);
      spyOn(component, 'isPreviousAvaiable').and.returnValue(false);
      component.news = fakedNewsList;
      fixture.detectChanges();
      const buttonNext = fixture.debugElement.nativeElement.querySelector(
        '.navigation__control--next'
      ).disabled;
      expect(buttonNext).toBeTruthy();

      const buttonPrev = fixture.debugElement.nativeElement.querySelector(
        '.navigation__control--previous'
      ).disabled;
      expect(buttonPrev).toBeTruthy();
    });

    it('component should keep same newslist as service', () => {
      const { component, fixture } = setup();
      fixture.detectChanges();

      const newsService = fixture.debugElement.injector.get(NewsService);
      const fakedNewsPage: NewsPage = {
        status: 'ok',
        totalResults: 1,
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
      spyOn(component, 'isPreviousAvaiable').and.returnValue(false);
      spyOn(component, 'isNextAvaiable').and.returnValue(false);
      expect(component.news).toEqual(fakedNewsPage.articles);
    });

    it('should change news list on change subject', () => {
      const { component, fixture } = setup();
      fixture.detectChanges();
      const newsService = fixture.debugElement.injector.get(NewsService);
      spyOn(component, 'isPreviousAvaiable').and.returnValue(false);
      spyOn(component, 'isNextAvaiable').and.returnValue(false);
      const fakedNewsPage1: NewsPage = {
        status: 'ok',
        totalResults: 1,
        articles: [
          {
            source: {
              id: '1',
              name: 'bbc'
            },
            author: 'John Doe 1',
            title: 'test title 1',
            description: 'test description 1',
            url: 'https://google.com',
            urlToImage:
              'https://splashbase.s3.amazonaws.com/unsplash/regular/tumblr_mopq69jlcS1st5lhmo1_1280.jpg',
            publishedAt: '2019-06-13T11:51:51Z',
            content: 'test contet 1'
          }
        ]
      };
      const fakedNewsPage2: NewsPage = {
        status: 'ok',
        totalResults: 1,
        articles: [
          {
            source: {
              id: '1',
              name: 'bbc'
            },
            author: 'John Doe 2',
            title: 'test title 2',
            description: 'test description 2',
            url: 'https://google.com',
            urlToImage:
              'https://splashbase.s3.amazonaws.com/unsplash/regular/tumblr_mopq69jlcS1st5lhmo1_1280.jpg',
            publishedAt: '2019-06-13T11:51:51Z',
            content: 'test contet 2'
          }
        ]
      };
      newsService.newsPage.next(fakedNewsPage1);
      expect(component.news).toEqual(fakedNewsPage1.articles);
      newsService.newsPage.next(fakedNewsPage2);
      expect(component.news).toEqual(fakedNewsPage2.articles);
    });

    it('should change page number in service params', () => {
      const { component, fixture } = setup();
      fixture.detectChanges();
      const newsService = fixture.debugElement.injector.get(NewsService);

      newsService.setParams({ page: 1 });
      component.nextPage();
      expect(newsService.requestParams.page).toEqual(2);

      newsService.setParams({ page: 2 });
      component.previousPage();
      expect(newsService.requestParams.page).toEqual(1);
    });
  });
});
