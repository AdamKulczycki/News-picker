import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { categoriesList } from './../shared/categories';
import { countriesList } from './../shared/countries';
import { NewsService } from '../services/news.service';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-news-search',
  templateUrl: './news-search.component.html',
  styleUrls: ['./news-search.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          transform: 'translateY(-100px)'
        })
      ),
      transition('void => *', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class NewsSearchComponent implements OnInit {
  constructor(private newsService: NewsService) {}

  searchFormSources: FormGroup;
  searchFormCountryCategory: FormGroup;

  availableCategories = categoriesList;
  availableCountries = countriesList;
  countrySwitch = true;
  isSubmittedSources = false;
  isSubmittedCC = false;

  ngOnInit() {
    this.searchFormSources = new FormGroup({
      parameters: new FormGroup(
        {
          sources: new FormControl(null),
          q: new FormControl(null)
        },
        this.reqOneParam
      ),
      pageSize: new FormControl(null, [Validators.max(100), Validators.min(1)])
    });
    this.searchFormCountryCategory = new FormGroup({
      parameters: new FormGroup(
        {
          country: new FormControl(null),
          category: new FormControl(null),
          q: new FormControl(null)
        },
        this.reqOneParam
      ),
      pageSize: new FormControl(null, [Validators.max(100), Validators.min(1)])
    });
  }

  switchMode() {
    this.countrySwitch = !this.countrySwitch;
  }

  onSubmitSources() {
    if (this.searchFormSources.valid) {
      const {
        pageSize,
        parameters: { q, sources }
      } = this.searchFormSources.value;
      const payload = { pageSize, q, sources };
      this.newsService.setParams(payload);
    } else {
      this.isSubmittedSources = true;
    }
  }

  onSubmitCountryCategory() {
    if (this.searchFormCountryCategory.valid) {
      const {
        pageSize,
        parameters: { country, category, q }
      } = this.searchFormCountryCategory.value;
      const payload = { pageSize, q, country, category };
      this.newsService.setParams(payload);
    } else {
      this.isSubmittedCC = true;
    }
  }

  resetFormSources() {
    this.searchFormSources.reset();
    this.isSubmittedSources = false;
  }
  resetFormCC() {
    this.searchFormCountryCategory.reset();
    this.isSubmittedCC = false;
  }

  reqOneParam(formGroup: FormGroup): { [s: string]: boolean } {
    for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        const control: FormControl = formGroup.controls[key] as FormControl;
        if (control.value) {
          return null;
        }
      }
    }
    return { zeroParams: true };
  }
}
