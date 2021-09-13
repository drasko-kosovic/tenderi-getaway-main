import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { HvalePonudeService } from '../service/hvale-ponude.service';

import { HvalePonudeComponent } from './hvale-ponude.component';

describe('Component Tests', () => {
  describe('HvalePonude Management Component', () => {
    let comp: HvalePonudeComponent;
    let fixture: ComponentFixture<HvalePonudeComponent>;
    let service: HvalePonudeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [HvalePonudeComponent],
      })
        .overrideTemplate(HvalePonudeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HvalePonudeComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(HvalePonudeService);

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
      expect(comp.hvalePonudes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
