import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopupService } from '../services/popup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.scss']
})
export class ErrorPopupComponent implements OnInit, OnDestroy {

  constructor(private popupService: PopupService) { }

  message: string;
  show = false;
  popupServiceSubscription: Subscription;
  ngOnInit() {
    this.popupService.popupSubject.subscribe(errorMessage => {
      this.setPopup(errorMessage);
    });
  }

  setPopup(message) {
    this.message = message;
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 8000);
  }

  close() {
    this.show = false;
  }

  ngOnDestroy() {
    this.popupServiceSubscription.unsubscribe();
  }

}
