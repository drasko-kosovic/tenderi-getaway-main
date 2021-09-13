import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { NarucilacService } from '../service/narucilac.service';

import { NarucilacComponent } from './narucilac.component';

describe('Component Tests', () => {
  describe('Narucilac Management Component', () => {
    let comp: NarucilacComponent;
    let fixture: ComponentFixture<NarucilacComponent>;
    let service: NarucilacService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [NarucilacComponent],
      })
        .overrideTemplate(NarucilacComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NarucilacComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(NarucilacService);

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
      expect(comp.narucilacs?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
