import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NarucilacDetailComponent } from './narucilac-detail.component';

describe('Component Tests', () => {
  describe('Narucilac Management Detail Component', () => {
    let comp: NarucilacDetailComponent;
    let fixture: ComponentFixture<NarucilacDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [NarucilacDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ narucilac: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(NarucilacDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NarucilacDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load narucilac on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.narucilac).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
