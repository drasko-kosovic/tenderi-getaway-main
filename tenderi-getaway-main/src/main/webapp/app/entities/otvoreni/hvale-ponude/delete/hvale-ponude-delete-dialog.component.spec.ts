jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { HvalePonudeService } from '../service/hvale-ponude.service';

import { HvalePonudeDeleteDialogComponent } from './hvale-ponude-delete-dialog.component';

describe('Component Tests', () => {
  describe('HvalePonude Management Delete Component', () => {
    let comp: HvalePonudeDeleteDialogComponent;
    let fixture: ComponentFixture<HvalePonudeDeleteDialogComponent>;
    let service: HvalePonudeService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [HvalePonudeDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(HvalePonudeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HvalePonudeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(HvalePonudeService);
      mockActiveModal = TestBed.inject(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({})));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        jest.spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.close).not.toHaveBeenCalled();
        expect(mockActiveModal.dismiss).toHaveBeenCalled();
      });
    });
  });
});
