import { TestBed, async } from '@angular/core/testing';
import { NewsItemComponent } from './news-item.component';
import { News } from '../models/news.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewsItem', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsItemComponent],
      imports: [BrowserAnimationsModule]
    }).compileComponents();
  }));

  describe(':', () => {
    function setup() {
      const fixture = TestBed.createComponent(NewsItemComponent);
      const component = fixture.debugElement.componentInstance;
      return { fixture, component };
    }
    it('should create the NewsItemComponent', () => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });
    it('should render News from Input', () => {
      const { component, fixture } = setup();
      const expectedInputNews: News = {
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
      };
      component.newsItem = expectedInputNews;
      const compiled = fixture.debugElement.nativeElement;
      fixture.detectChanges();
      expect(compiled.querySelector('.article__title').textContent).toContain(
        expectedInputNews.title
      );
      expect(
        compiled.querySelector('.article__description').textContent
      ).toContain(expectedInputNews.description);
      expect(compiled.querySelector('.article__author').textContent).toContain(
        expectedInputNews.author
      );
      expect(compiled.querySelector('.article__date').textContent).toContain(
        'Jun 13, 2019'
      );
    });
  });
});
