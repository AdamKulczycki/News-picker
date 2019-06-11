import { Component, Input } from '@angular/core';
import { News } from '../models/news.model';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent{

  constructor() {}
  @Input() news: News[];
}
