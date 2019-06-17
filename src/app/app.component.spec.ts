import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsSearchComponent } from './news-search/news-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorPopupComponent } from './error-popup/error-popup.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NewsComponent,
        NewsItemComponent,
        NewsListComponent,
        NewsSearchComponent,
        FooterComponent,
        ErrorPopupComponent
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  describe(':', () => {
    function setup() {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      return { fixture, app };
    }
    it('should create the app', () => {
      const { app, fixture } = setup();
      fixture.detectChanges();
      expect(app).toBeTruthy();
    });
  });
});
