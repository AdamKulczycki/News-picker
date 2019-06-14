import { TestBed } from '@angular/core/testing';

import { NewsService } from './news.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('NewsService', () => {
  describe(':', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [NewsService],
        imports: [HttpClientTestingModule]
      });
    });

    function setup() {
      const newsService = TestBed.get(NewsService);
      const httpTestingController = TestBed.get(HttpTestingController);
      return { newsService, httpTestingController };
    }

    it('should return false to isLastPage', () => {
      const { newsService, httpTestingController } = setup();
      newsService.totalResults = 201;
      newsService.requestParams = {
        page: 2,
        pageSize: 100
      };
      expect(newsService.isLastPage()).toBeFalsy();
    });

    it('should return true to isFirstPage', () => {
      const { newsService, httpTestingController } = setup();
      newsService.totalResults = 201;
      newsService.setParams({ page: 1 });
      expect(newsService.isFirstPage()).toBeTruthy();
    });

    it('should changePage to +1', () => {
      const { newsService, httpTestingController } = setup();
      newsService.setParams({ page: 1 });
      newsService.changePageToNext(true);
      expect(newsService.requestParams.page).toEqual(2);
    });
    it('should changePage to -1', () => {
      const { newsService, httpTestingController } = setup();
      newsService.setParams({ page: 2 });
      newsService.changePageToNext(false);
      expect(newsService.requestParams.page).toEqual(1);
    });
  });
});
