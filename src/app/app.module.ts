import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsSearchComponent } from './news-search/news-search.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { NewsComponent } from './news/news.component';
import { FooterComponent } from './footer/footer.component';
import { CutTextPipe } from './pipes/cut-text.pipe';
import { EllipsisModule } from 'ngx-ellipsis';
import { ErrorPopupComponent } from './error-popup/error-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    NewsSearchComponent,
    NewsListComponent,
    NewsItemComponent,
    NewsComponent,
    FooterComponent,
    CutTextPipe,
    ErrorPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EllipsisModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
