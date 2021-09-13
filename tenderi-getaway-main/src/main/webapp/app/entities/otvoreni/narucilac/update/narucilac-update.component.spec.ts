jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { NarucilacService } from '../service/narucilac.service';
import { INarucilac, Narucilac } from '../narucilac.model';

import { NarucilacUpdateComponent } from './narucilac-update.component';

describe('Component Tests', () => {
  describe('Narucilac Management Update Component', () => {
    let comp: NarucilacUpdateComponent;
    let fixture: ComponentFixture<NarucilacUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let narucilacService: NarucilacService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [NarucilacUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(NarucilacUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NarucilacUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      narucilacService = TestBed.inject(NarucilacService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const narucilac: INarucilac = { id: 456 };

        activatedRoute.data = of({ narucilac });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(narucilac));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const narucilac = { id: 123 };
        spyOn(narucilacService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ narucilac });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: narucilac }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(narucilacService.update).toHaveBeenCalledWith(narucilac);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const narucilac = new Narucilac();
        spyOn(narucilacService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ narucilac });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: narucilac }));
        saveSubject.complete();

        // THEN
        expect(narucilacService.create).toHaveBeenCalledWith(narucilac);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const narucilac = { id: 123 };
        spyOn(narucilacService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ narucilac });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(narucilacService.update).toHaveBeenCalledWith(narucilac);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
