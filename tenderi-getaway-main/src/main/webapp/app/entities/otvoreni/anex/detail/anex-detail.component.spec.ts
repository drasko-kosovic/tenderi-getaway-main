import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AnexDetailComponent } from './anex-detail.component';

describe('Component Tests', () => {
  describe('Anex Management Detail Component', () => {
    let comp: AnexDetailComponent;
    let fixture: ComponentFixture<AnexDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [AnexDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ anex: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(AnexDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AnexDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load anex on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.anex).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
