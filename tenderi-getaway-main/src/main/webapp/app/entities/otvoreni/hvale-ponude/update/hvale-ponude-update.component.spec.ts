jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { HvalePonudeService } from '../service/hvale-ponude.service';
import { IHvalePonude, HvalePonude } from '../hvale-ponude.model';

import { HvalePonudeUpdateComponent } from './hvale-ponude-update.component';

describe('Component Tests', () => {
  describe('HvalePonude Management Update Component', () => {
    let comp: HvalePonudeUpdateComponent;
    let fixture: ComponentFixture<HvalePonudeUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let hvalePonudeService: HvalePonudeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [HvalePonudeUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(HvalePonudeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HvalePonudeUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      hvalePonudeService = TestBed.inject(HvalePonudeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const hvalePonude: IHvalePonude = { id: 456 };

        activatedRoute.data = of({ hvalePonude });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(hvalePonude));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<HvalePonude>>();
        const hvalePonude = { id: 123 };
        jest.spyOn(hvalePonudeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ hvalePonude });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: hvalePonude }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(hvalePonudeService.update).toHaveBeenCalledWith(hvalePonude);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<HvalePonude>>();
        const hvalePonude = new HvalePonude();
        jest.spyOn(hvalePonudeService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ hvalePonude });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: hvalePonude }));
        saveSubject.complete();

        // THEN
        expect(hvalePonudeService.create).toHaveBeenCalledWith(hvalePonude);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<HvalePonude>>();
        const hvalePonude = { id: 123 };
        jest.spyOn(hvalePonudeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ hvalePonude });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(hvalePonudeService.update).toHaveBeenCalledWith(hvalePonude);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
