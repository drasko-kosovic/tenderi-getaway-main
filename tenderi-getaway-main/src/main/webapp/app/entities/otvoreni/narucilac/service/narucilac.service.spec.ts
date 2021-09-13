import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { INarucilac, Narucilac } from '../narucilac.model';

import { NarucilacService } from './narucilac.service';

describe('Service Tests', () => {
  describe('Narucilac Service', () => {
    let service: NarucilacService;
    let httpMock: HttpTestingController;
    let elemDefault: INarucilac;
    let expectedResult: INarucilac | INarucilac[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(NarucilacService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        naziv: 'AAAAAAA',
        racun: 'AAAAAAA',
        telefon: 'AAAAAAA',
        pib: 'AAAAAAA',
        pdv: 'AAAAAAA',
        odgovornoLiceNarucioca: 'AAAAAAA',
        email: 'AAAAAAA',
        adresa: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Narucilac', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Narucilac()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Narucilac', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            naziv: 'BBBBBB',
            racun: 'BBBBBB',
            telefon: 'BBBBBB',
            pib: 'BBBBBB',
            pdv: 'BBBBBB',
            odgovornoLiceNarucioca: 'BBBBBB',
            email: 'BBBBBB',
            adresa: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Narucilac', () => {
        const patchObject = Object.assign(
          {
            racun: 'BBBBBB',
            pib: 'BBBBBB',
            pdv: 'BBBBBB',
            odgovornoLiceNarucioca: 'BBBBBB',
            email: 'BBBBBB',
            adresa: 'BBBBBB',
          },
          new Narucilac()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Narucilac', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            naziv: 'BBBBBB',
            racun: 'BBBBBB',
            telefon: 'BBBBBB',
            pib: 'BBBBBB',
            pdv: 'BBBBBB',
            odgovornoLiceNarucioca: 'BBBBBB',
            email: 'BBBBBB',
            adresa: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Narucilac', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addNarucilacToCollectionIfMissing', () => {
        it('should add a Narucilac to an empty array', () => {
          const narucilac: INarucilac = { id: 123 };
          expectedResult = service.addNarucilacToCollectionIfMissing([], narucilac);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(narucilac);
        });

        it('should not add a Narucilac to an array that contains it', () => {
          const narucilac: INarucilac = { id: 123 };
          const narucilacCollection: INarucilac[] = [
            {
              ...narucilac,
            },
            { id: 456 },
          ];
          expectedResult = service.addNarucilacToCollectionIfMissing(narucilacCollection, narucilac);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Narucilac to an array that doesn't contain it", () => {
          const narucilac: INarucilac = { id: 123 };
          const narucilacCollection: INarucilac[] = [{ id: 456 }];
          expectedResult = service.addNarucilacToCollectionIfMissing(narucilacCollection, narucilac);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(narucilac);
        });

        it('should add only unique Narucilac to an array', () => {
          const narucilacArray: INarucilac[] = [{ id: 123 }, { id: 456 }, { id: 9529 }];
          const narucilacCollection: INarucilac[] = [{ id: 123 }];
          expectedResult = service.addNarucilacToCollectionIfMissing(narucilacCollection, ...narucilacArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const narucilac: INarucilac = { id: 123 };
          const narucilac2: INarucilac = { id: 456 };
          expectedResult = service.addNarucilacToCollectionIfMissing([], narucilac, narucilac2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(narucilac);
          expect(expectedResult).toContain(narucilac2);
        });

        it('should accept null and undefined values', () => {
          const narucilac: INarucilac = { id: 123 };
          expectedResult = service.addNarucilacToCollectionIfMissing([], null, narucilac, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(narucilac);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
