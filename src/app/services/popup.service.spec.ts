import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PopupService } from './popup.service';

describe('PopupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  describe(':', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [PopupService]
      });
    });

    function setup() {
      const popupService = TestBed.get(PopupService);
      return { popupService };
    }

    it('should be created', () => {
      const { popupService } = setup();
      expect(popupService).toBeTruthy();
    });

    it('should properly decode error and set subject with message', fakeAsync(() => {
      const { popupService } = setup();
      let response = null;
      const fakedError = {
        error: {
          message: 'error message'
        }
      };
      popupService.popupSubject.subscribe((res: string) => {
        response = res;
      });
      popupService.errorDecode(fakedError);
      tick();
      expect(response).toBe('error message');
      popupService.errorDecode({ error: { message: '' } });
      tick();
      expect(response).toBe('Unexpected Error Occurred');
    }));
  });
});
