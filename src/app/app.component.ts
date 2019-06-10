import { Component, OnInit } from '@angular/core';
import { NewsService } from './services/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private newsService: NewsService) {}
  title = 'news-picker';

  ngOnInit() {
    this.newsService.getNews().subscribe(res => console.log(res))
  }
}
