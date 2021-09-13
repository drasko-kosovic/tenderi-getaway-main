jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { AnexService } from '../service/anex.service';
import { IAnex, Anex } from '../anex.model';

import { AnexUpdateComponent } from './anex-update.component';

describe('Component Tests', () => {
  describe('Anex Management Update Component', () => {
    let comp: AnexUpdateComponent;
    let fixture: ComponentFixture<AnexUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let anexService: AnexService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [AnexUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(AnexUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AnexUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      anexService = TestBed.inject(AnexService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const anex: IAnex = { id: 456 };

        activatedRoute.data = of({ anex });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(anex));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Anex>>();
        const anex = { id: 123 };
        jest.spyOn(anexService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ anex });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: anex }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(anexService.update).toHaveBeenCalledWith(anex);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Anex>>();
        const anex = new Anex();
        jest.spyOn(anexService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ anex });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: anex }));
        saveSubject.complete();

        // THEN
        expect(anexService.create).toHaveBeenCalledWith(anex);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Anex>>();
        const anex = { id: 123 };
        jest.spyOn(anexService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ anex });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(anexService.update).toHaveBeenCalledWith(anex);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
