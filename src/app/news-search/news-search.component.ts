import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { categoriesList } from './../shared/categories';
import { countriesList } from './../shared/countries';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-search',
  templateUrl: './news-search.component.html',
  styleUrls: ['./news-search.component.scss']
})
export class NewsSearchComponent implements OnInit {
  constructor(private newsService: NewsService) {}

  searchFormSources: FormGroup;
  searchFormCountryCategory: FormGroup;

  availableCategories = categoriesList;
  availableCountries = countriesList;
  countrySwitch = true;

  // extractParamsFromObj(form: FormGroup) {
  //   const params = [];
  //   for (const i in form) {
  //     if (i === 'parameters') {
  //       for (const ii in form[i]) {
  //         if (form[i][ii]) {
  //           params.push({[ii]: form[i][ii]});
  //         }
  //       }
  //     } else {
  //       if (form[i]) {
  //         params.push({[i]: form[i]});
  //       }
  //     }
  //   }
  //   return params;
  // }
  onSubmitSources() {
    const {pageSize, parameters: {q, sources}} = this.searchFormSources.value;
    const payload = {pageSize, q, sources};
    this.newsService.setParams(payload);
  }

  onSubmitCountryCategory() {
    const {pageSize, parameters: {country, category, q}} = this.searchFormCountryCategory.value;
    const payload = {pageSize, q, country, category};
    this.newsService.setParams(payload);
  }

  reqOneParam(formGroup: FormGroup): {[s: string]: boolean} {
    for (const key in formGroup.controls){
      if (formGroup.controls.hasOwnProperty(key)) {
        const control: FormControl = formGroup.controls[key] as FormControl;
        if (control.value) {
          return null;
        }
      }
    }
    return { zeroParams: false };
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
