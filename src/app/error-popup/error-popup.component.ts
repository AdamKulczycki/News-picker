import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopupService } from '../services/popup.service';
import { Subscription } from 'rxjs';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          transform: 'translateY(100px)'
        })
      ),
      transition('void => *', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition('* => void', [
        animate(500, style({ opacity: 0, transform: 'translateY(100px)' }))
      ])
    ])
  ]
})
export class ErrorPopupComponent implements OnInit, OnDestroy {
  constructor(private popupService: PopupService) {}

  message: string;
  show = false;
  timer;
  popupServiceSubscription: Subscription;

  ngOnInit() {
    this.popupService.popupSubject.subscribe(errorMessage => {
      this.setPopup(errorMessage);
    });
  }

  setPopup(message) {
    this.message = message;
    this.show = true;
  }

  animationControler(event) {
    if (event.fromState === 'void') {
      this.timer = setTimeout(() => {
        this.show = false;
      }, 6000);
    }
  }

  close() {
    clearTimeout(this.timer);
    this.show = false;
  }

  ngOnDestroy() {
    this.popupServiceSubscription.unsubscribe();
  }
}
