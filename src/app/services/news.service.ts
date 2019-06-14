import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { NewsPage } from '../models/newsPage.model';

export interface RequestParams {
  country?: string;
  category?: string;
  q?: string;
  sources?: string;
  pageSize?: number;
  page?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http: HttpClient) {}
  newsPage = new Subject<NewsPage>();
  totalResults: number;
  requestParams: RequestParams;

  setParams(params: RequestParams) {
    const {country, category, q, pageSize, page, sources} = params;
    this.requestParams = {
      ...!!country && { country },
      ...!!category && { category },
      ...!!q && { q },
      ...!!sources && { sources },
      ...(!!pageSize && { pageSize }) || { pageSize: 20 },
      ...(!!page && { page }) || { page: 1 }
    };

    this.getNews(this.requestParams);
  }

  isLastPage() {
    return this.requestParams.page * this.requestParams.pageSize >= this.totalResults;
  }

  isFirstPage() {
    return this.requestParams.page === 1;
  }

  changePageToNext(next: boolean) {
    next ? this.requestParams.page = this.requestParams.page + 1 : this.requestParams.page = this.requestParams.page - 1;
    this.getNews(this.requestParams);
  }

  getNews(params: object) {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      httpParams = httpParams.append(key, value);
    });

    this.http
      .get<NewsPage>(
        `https://newsapi.org/v2/top-headlines?apiKey=${environment.api_key}`,
        { params: httpParams }
      )
      .subscribe(newsPageRes => {
        console.log(newsPageRes);
        this.newsPage.next(newsPageRes);
        this.totalResults = newsPageRes.totalResults;
      });
  }
}
