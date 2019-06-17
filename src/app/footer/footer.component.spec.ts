import { TestBed, async } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('Footer component', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent]
    });
  });

  describe(':', () => {
    function setup() {
      const fixture = TestBed.createComponent(FooterComponent);
      const app = fixture.debugElement.componentInstance;
      return { fixture, app };
    }

    it('it should create the component Footer', async(() => {
      const { app } = setup();
      expect(app).toBeTruthy();
    }));

    it('it should render NewsAPI.org attribution in p tag with class footer__message', async(() => {
      const { fixture } = setup();
      const compiled = fixture.debugElement.nativeElement;
      fixture.detectChanges();
      expect(compiled.querySelector('p.footer__message').textContent).toContain(
        'powered by NewsAPI.org'
      );
    }));
  });
});
