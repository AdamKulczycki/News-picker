import { Component, Input } from '@angular/core';
import { News } from '../models/news.model';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1}))
      ]),
    ])
  ]
})
export class NewsItemComponent {

  constructor() { }

  @Input() newsItem: News;
}
