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

    it('should be created', () => {
      const { newsService } = setup();
      expect(newsService).toBeTruthy();
    });

    it('validity isFirstPage, isLastPage', () => {
      const { newsService } = setup();
      newsService.totalResults = 201;
      newsService.requestParams = {
        page: 2,
        pageSize: 100
      };
      expect(newsService.isLastPage()).toBeFalsy();
      newsService.setParams({ page: 1 });
      expect(newsService.isFirstPage()).toBeTruthy();
    });

    it('should changePage to previous or next one in service params', () => {
      const { newsService } = setup();
      newsService.setParams({ page: 1 });
      newsService.changePageToNext(true);
      expect(newsService.requestParams.page).toEqual(2);
      newsService.setParams({ page: 2 });
      newsService.changePageToNext(false);
      expect(newsService.requestParams.page).toEqual(1);
    });
  });
});
