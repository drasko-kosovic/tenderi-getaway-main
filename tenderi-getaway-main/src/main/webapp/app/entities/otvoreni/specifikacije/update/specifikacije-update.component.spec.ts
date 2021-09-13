jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SpecifikacijeService } from '../service/specifikacije.service';
import { ISpecifikacije, Specifikacije } from '../specifikacije.model';

import { SpecifikacijeUpdateComponent } from './specifikacije-update.component';

describe('Component Tests', () => {
  describe('Specifikacije Management Update Component', () => {
    let comp: SpecifikacijeUpdateComponent;
    let fixture: ComponentFixture<SpecifikacijeUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let specifikacijeService: SpecifikacijeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SpecifikacijeUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(SpecifikacijeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SpecifikacijeUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      specifikacijeService = TestBed.inject(SpecifikacijeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const specifikacije: ISpecifikacije = { id: 456 };

        activatedRoute.data = of({ specifikacije });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(specifikacije));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const specifikacije = { id: 123 };
        spyOn(specifikacijeService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ specifikacije });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: specifikacije }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(specifikacijeService.update).toHaveBeenCalledWith(specifikacije);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const specifikacije = new Specifikacije();
        spyOn(specifikacijeService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ specifikacije });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: specifikacije }));
        saveSubject.complete();

        // THEN
        expect(specifikacijeService.create).toHaveBeenCalledWith(specifikacije);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const specifikacije = { id: 123 };
        spyOn(specifikacijeService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ specifikacije });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(specifikacijeService.update).toHaveBeenCalledWith(specifikacije);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
