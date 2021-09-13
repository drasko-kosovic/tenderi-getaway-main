import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AnexService } from '../service/anex.service';

import { AnexComponent } from './anex.component';

describe('Component Tests', () => {
  describe('Anex Management Component', () => {
    let comp: AnexComponent;
    let fixture: ComponentFixture<AnexComponent>;
    let service: AnexService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [AnexComponent],
      })
        .overrideTemplate(AnexComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AnexComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(AnexService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'query').mockReturnValue(
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
      expect(comp.anexes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
