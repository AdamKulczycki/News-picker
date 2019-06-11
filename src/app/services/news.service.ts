import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  ///tu ma byc object, bede tworzyl obiekt typu httpparams
  getNews(params: Array<object>) {
    let httpParams = new HttpParams();
    for (const param of params) {
      httpParams = httpParams.append(Object.keys(param)[0], Object.values(param)[0]);
    }
    console.log(httpParams.toString());
    return this.http.get(`https://newsapi.org/v2/top-headlines?apiKey=${environment.api_key}`, {params: httpParams});
  }
}
