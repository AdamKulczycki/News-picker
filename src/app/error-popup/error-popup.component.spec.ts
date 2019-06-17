import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ErrorPopupComponent } from './error-popup.component';
import { PopupService } from '../services/popup.service';

describe('ErrorPopupComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorPopupComponent],
      providers: [PopupService]
    }).compileComponents();
  }));

  describe(':', () => {
    function setup() {
      const fixture = TestBed.createComponent(ErrorPopupComponent);
      const component = fixture.debugElement.componentInstance;
      return { fixture, component };
    }
    it('should create the app', () => {
      const { fixture, component } = setup();
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should setup poppup', () => {
      const { fixture, component } = setup();
      fixture.detectChanges();
      component.setPopup('test error');
      expect(component.message).toBe('test error');
      expect(component.show).toBeTruthy();
    });

    it('should clear timer and close popup', () => {
      const { fixture, component } = setup();
      fixture.detectChanges();
      component.timer = setTimeout(() => {}, 6000);
      component.close();
      expect(component.timer).toEqual(jasmine.any(Number));
      expect(component.show).toBeFalsy();
    });

    it('should setup popup from service', () => {
      const { fixture, component } = setup();
      fixture.detectChanges();
      const popupService = fixture.debugElement.injector.get(PopupService);
      popupService.popupSubject.next('test error');
      expect(component.message).toBe('test error');
      expect(component.show).toBeTruthy();
    });

    it('should change show flag when animation is done', fakeAsync(() => {
      const { fixture, component } = setup();
      fixture.detectChanges();
      component.show = true;
      component.animationControler({ fromState: 'void' });
      tick(6000);
      fixture.whenStable().then(() => {
        expect(component.show).toBeFalsy();
      });
    }));

    it('should not change show flag when animation diffrent than from void', () => {
      const { fixture, component } = setup();
      fixture.detectChanges();
      component.show = true;
      component.animationControler({ fromtState: 'notVoid' });
      expect(component.show).toBeTruthy();
    });
  });
});
