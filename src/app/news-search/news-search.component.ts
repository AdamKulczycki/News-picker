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

  switchMode() {
    this.countrySwitch = !this.countrySwitch;
  }

  onSubmitSources() {
    const {pageSize, parameters: {q, sources}} = this.searchFormSources.value;
    const payload = {pageSize, q, sources};
    console.log(this.searchFormSources.value);
    this.newsService.setParams(payload);
  }

  onSubmitCountryCategory() {
    const {pageSize, parameters: {country, category, q}} = this.searchFormCountryCategory.value;
    const payload = {pageSize, q, country, category};
    this.newsService.setParams(payload);
  }

  checkControls(form: FormGroup) {
    if (form.controls.parameters.errors && !form.controls.parameters.errors.zeroParams) {
      for (const control of Object.values(form.controls.parameters['controls'])) {
        if (!control['touched']) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  resetForm(form: FormGroup) {
    form.reset();
  }

  // resetCCForm() {
  //   this.searchFormCountryCategory.reset();
  // }

  reqOneParam(formGroup: FormGroup): {[s: string]: boolean} {
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


  ngOnInit() {
    this.searchFormSources = new FormGroup({
      'parameters': new FormGroup({
        'sources': new FormControl(null),
        'q': new FormControl(null),
      }, this.reqOneParam),
      'pageSize': new FormControl(null, [Validators.max(100), Validators.min(1)])
    });
    this.searchFormCountryCategory = new FormGroup({
      'parameters': new FormGroup({
        'country': new FormControl(null),
        'category': new FormControl(null),
        'q': new FormControl(null),
      }, this.reqOneParam),
      'pageSize': new FormControl(null, [Validators.max(100), Validators.min(1)])
    });
  }
}
