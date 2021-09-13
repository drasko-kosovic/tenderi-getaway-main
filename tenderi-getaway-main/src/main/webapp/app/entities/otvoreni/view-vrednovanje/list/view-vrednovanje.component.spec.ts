import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ViewVrednovanjeService } from '../service/view-vrednovanje.service';

import { ViewVrednovanjeComponent } from './view-vrednovanje.component';

describe('Component Tests', () => {
  describe('ViewVrednovanje Management Component', () => {
    let comp: ViewVrednovanjeComponent;
    let fixture: ComponentFixture<ViewVrednovanjeComponent>;
    let service: ViewVrednovanjeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ViewVrednovanjeComponent],
      })
        .overrideTemplate(ViewVrednovanjeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ViewVrednovanjeComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ViewVrednovanjeService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.viewVrednovanjes?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
