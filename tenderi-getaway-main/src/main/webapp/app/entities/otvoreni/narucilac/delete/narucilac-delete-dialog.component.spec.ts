jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { NarucilacService } from '../service/narucilac.service';

import { NarucilacDeleteDialogComponent } from './narucilac-delete-dialog.component';

describe('Component Tests', () => {
  describe('Narucilac Management Delete Component', () => {
    let comp: NarucilacDeleteDialogComponent;
    let fixture: ComponentFixture<NarucilacDeleteDialogComponent>;
    let service: NarucilacService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [NarucilacDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(NarucilacDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NarucilacDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(NarucilacService);
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
