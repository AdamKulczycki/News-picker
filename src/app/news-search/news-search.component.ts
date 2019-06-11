import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-news-search',
  templateUrl: './news-search.component.html',
  styleUrls: ['./news-search.component.scss']
})
export class NewsSearchComponent implements OnInit {
  constructor() {}

  @Output() getNews: EventEmitter<Array<object>> = new EventEmitter();
  searchFormSources: FormGroup;
  searchFormCountryCategory: FormGroup;
  // onSubmit(form: NgForm) {
  //   ///JAKOS LADNIE WYDOBYWAC PARAMETRY
  //   console.log(form.value);
  //   const v = Object.values(form.value);
  //   const k = Object.keys(form.value);

  //   let urlparams = '?'
  //   for (let i=0; i<v.length; i++) {
  //     urlparams += `${k[i]}=${v[i]}&`;
  //   }
  //   this.getNews.emit(urlparams);
  // }

  countrySwitch = true;

  extractParamsFromObj(form: FormGroup) {
    const params = [];
    for (const i in form) {
      if (i === 'parameters') {
        for (const ii in form[i]) {
          if (form[i][ii]) {
            params.push({[ii]: form[i][ii]});
          }
        }
      } else {
        if (form[i]) {
          params.push({[i]: form[i]});
        }
      }
    }
    return params;
  }
  onSubmitSources() {
    const params = this.extractParamsFromObj(this.searchFormSources.value);
    this.getNews.emit(params)
  }

  onSubmitCountryCategory() {
    const params = this.extractParamsFromObj(this.searchFormCountryCategory.value);
    this.getNews.emit(params)
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
