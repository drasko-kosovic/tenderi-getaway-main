jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PostupciService } from '../service/postupci.service';
import { IPostupci, Postupci } from '../postupci.model';

import { PostupciUpdateComponent } from './postupci-update.component';

describe('Component Tests', () => {
  describe('Postupci Management Update Component', () => {
    let comp: PostupciUpdateComponent;
    let fixture: ComponentFixture<PostupciUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let postupciService: PostupciService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PostupciUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PostupciUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PostupciUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      postupciService = TestBed.inject(PostupciService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const postupci: IPostupci = { id: 456 };

        activatedRoute.data = of({ postupci });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(postupci));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const postupci = { id: 123 };
        spyOn(postupciService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ postupci });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: postupci }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(postupciService.update).toHaveBeenCalledWith(postupci);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const postupci = new Postupci();
        spyOn(postupciService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ postupci });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: postupci }));
        saveSubject.complete();

        // THEN
        expect(postupciService.create).toHaveBeenCalledWith(postupci);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const postupci = { id: 123 };
        spyOn(postupciService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ postupci });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(postupciService.update).toHaveBeenCalledWith(postupci);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
