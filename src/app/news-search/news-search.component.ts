import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-news-search',
  templateUrl: './news-search.component.html',
  styleUrls: ['./news-search.component.scss']
})
export class NewsSearchComponent implements OnInit {
  constructor() {}

  disCon = false;
  disQ = false;
  onSubmit(form: NgForm) {
    console.log(form.value);
  }
  print(category) {
    console.log(category.value)
  }
  ngOnInit() {}
}
