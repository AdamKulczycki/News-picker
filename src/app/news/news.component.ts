import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  constructor(private newsService: NewsService) { }
  statusSubscription: Subscription;
  resultsSubscription: Subscription;

  ifSearched = false;
  pending = false;
  noResults: boolean;
  ngOnInit() {
    this.statusSubscription = this.newsService.pendingStatus.subscribe(res => {
      this.ifSearched = true;
      this.pending = res;
    });
    
    this.resultsSubscription = this.newsService.newsPage.subscribe(res => {
      res.articles.length > 0 ? this.noResults = false : this.noResults = true;
    });
  }

  ngOnDestroy() {
    this.statusSubscription.unsubscribe();
    this.resultsSubscription.unsubscribe();
  }
}
