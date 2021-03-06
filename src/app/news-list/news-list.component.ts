import { Component, OnInit, OnDestroy } from '@angular/core';
import { News } from '../models/news.model';
import { Subscription } from 'rxjs';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit, OnDestroy {
  constructor(private newsService: NewsService) {}
  newsServiceSubscription: Subscription;
  news: News[];

  ngOnInit() {
    this.newsServiceSubscription = this.newsService.newsPage.subscribe(
      response => {
        this.news = response.articles;
      }
    );
  }

  isPreviousAvaiable() {
    return !this.newsService.isFirstPage();
  }

  isNextAvaiable() {
    return !this.newsService.isLastPage();
  }

  nextPage() {
    this.newsService.changePageToNext(true);
    this.news = [];
    window.scroll(0, 0);
  }

  previousPage() {
    this.newsService.changePageToNext(false);
    this.news = [];
    window.scroll(0, 0);
  }

  ngOnDestroy() {
    this.newsServiceSubscription.unsubscribe();
  }
}
