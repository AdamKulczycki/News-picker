import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NewsSearchComponent } from './news-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewsService } from '../services/news.service';

describe('NewsSearchComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsSearchComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [NewsService]
    }).compileComponents();
  }));

  describe(':', () => {
    function setup() {
      const fixture = TestBed.createComponent(NewsSearchComponent);
      const component = fixture.debugElement.componentInstance;
      return { fixture, component };
    }

    it('form invalid when empty', () => {
      const { fixture, component } = setup();
      fixture.detectChanges();
      expect(component.searchFormSources.valid).toBeFalsy();
      expect(component.searchFormCountryCategory.valid).toBeFalsy();
    });

    it('page size field validity', () => {
        const { fixture, component } = setup();
        fixture.detectChanges();
        let pageSize = component.searchFormSources.controls.pageSize;

        let errors = {};
        pageSize.setValue(101)
        errors = pageSize.errors || {};
        expect(errors['max']).toBeTruthy();

        pageSize.setValue(0);
        errors = pageSize.errors || {};
        expect(errors['min']).toBeTruthy();

        pageSize = component.searchFormCountryCategory.controls.pageSize;

        pageSize.setValue(101)
        errors = pageSize.errors || {};
        expect(errors['max']).toBeTruthy();

        pageSize.setValue(0);
        errors = pageSize.errors || {};
        expect(errors['min']).toBeTruthy();
    });

    it('form validity', () => {
        const { fixture, component } = setup();
        fixture.detectChanges();
        let errors = {};

        /// searchFormSources Form
        const requireParameters1 = component.searchFormSources.controls.parameters;
        requireParameters1.controls.sources.setValue('bbc-news'); // at least one paremeter in 'parameters' FormGroup is requierd
        errors = requireParameters1.errors || {};
        expect(errors['zeroParams']).toBeFalsy();
        expect(component.searchFormSources.valid).toBeTruthy();

        const pageSize1 = component.searchFormSources.controls.pageSize;
        requireParameters1.controls.sources.reset();
        pageSize1.setValue(20); //its not one of the required 'parameters' FormGroup
        errors = pageSize1.errors || {};
        expect(component.searchFormSources.valid).toBeFalsy();

        /// searchFormCountryCategory Form
        const requireParameters2 = component.searchFormCountryCategory.controls.parameters;
        requireParameters2.controls.country.setValue('pl'); // at least one paremeter in 'parameters' FormGroup is requierd
        errors = requireParameters2.errors || {};
        expect(errors['zeroParams']).toBeFalsy();
        expect(component.searchFormCountryCategory.valid).toBeTruthy();

        const pageSize2 = component.searchFormCountryCategory.controls.pageSize;
        requireParameters2.controls.country.reset();
        pageSize2.setValue(20); //it's not one of the required 'parameters' FormGroup
        errors = pageSize2.errors || {};
        expect(component.searchFormCountryCategory.valid).toBeFalsy();
    });

    it('should switch form mode', () => {
        const { fixture, component } = setup();
        fixture.detectChanges();
        component.countrySwitch = true;
        component.switchMode();
        expect(component.countrySwitch).toBeFalsy();

        component.countrySwitch = false;
        component.switchMode();
        expect(component.countrySwitch).toBeTruthy();
    });

    it('should set params in service', () => {
        const { fixture, component } = setup();
        const newsService = fixture.debugElement.injector.get(NewsService);
        fixture.detectChanges();

        const countryValue = 'pl';
        component.searchFormCountryCategory.controls.parameters.controls.country.setValue(countryValue);
        component.onSubmitCountryCategory();
        expect(newsService.requestParams.country).toBe(countryValue);

        const sourcesValue = 'bbc-news';
        component.searchFormSources.controls.parameters.controls.sources.setValue(sourcesValue);
        component.onSubmitSources();
        expect(newsService.requestParams.sources).toBe(sourcesValue);
    });

    it('should reset the form', () => {
        const { fixture, component } = setup();
        fixture.detectChanges();
        component.searchFormCountryCategory.controls.parameters.controls.country.setValue('pl');
        component.resetForm(component.searchFormCountryCategory);
        const {parameters: {country, category, q} , pageSize} = component.searchFormCountryCategory.value;
        expect(country).toBeNull();
        expect(category).toBeNull();
        expect(q).toBeNull();
        expect(pageSize).toBeNull();
    });
  });
});
