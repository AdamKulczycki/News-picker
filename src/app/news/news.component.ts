import { Component, OnInit } from '@angular/core';
import { NewsPage } from '../models/newsPage.model';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  constructor(private newsService: NewsService) { }

  NewsPage: NewsPage;

  ngOnInit() {
  }
  onNewsEvent(params: Array<object>) {
    this.newsService.getNews(params)
      .subscribe((newsPageRes: NewsPage) => {
        console.log(newsPageRes);
        this.NewsPage = newsPageRes;
      });
  }
}
