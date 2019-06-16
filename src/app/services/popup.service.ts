import { Injectable } from '@angular/core';
import { Subject, ErrorObserver } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  popupSubject = new Subject<string>();

  errorDecode(err) {
    let message = '';
    err.error.message ? message = err.error.message : message = 'Unexpected Error Occurred';
    this.popupSubject.next(message);
  }
}
