jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { UgovorService } from '../service/ugovor.service';
import { IUgovor, Ugovor } from '../ugovor.model';

import { UgovorUpdateComponent } from './ugovor-update.component';

describe('Component Tests', () => {
  describe('Ugovor Management Update Component', () => {
    let comp: UgovorUpdateComponent;
    let fixture: ComponentFixture<UgovorUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let ugovorService: UgovorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [UgovorUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(UgovorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UgovorUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      ugovorService = TestBed.inject(UgovorService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const ugovor: IUgovor = { id: 456 };

        activatedRoute.data = of({ ugovor });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(ugovor));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Ugovor>>();
        const ugovor = { id: 123 };
        jest.spyOn(ugovorService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ ugovor });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: ugovor }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(ugovorService.update).toHaveBeenCalledWith(ugovor);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Ugovor>>();
        const ugovor = new Ugovor();
        jest.spyOn(ugovorService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ ugovor });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: ugovor }));
        saveSubject.complete();

        // THEN
        expect(ugovorService.create).toHaveBeenCalledWith(ugovor);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Ugovor>>();
        const ugovor = { id: 123 };
        jest.spyOn(ugovorService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ ugovor });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(ugovorService.update).toHaveBeenCalledWith(ugovor);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
