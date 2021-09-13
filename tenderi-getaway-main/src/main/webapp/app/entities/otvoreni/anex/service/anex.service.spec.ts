import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAnex, Anex } from '../anex.model';

import { AnexService } from './anex.service';

describe('Service Tests', () => {
  describe('Anex Service', () => {
    let service: AnexService;
    let httpMock: HttpTestingController;
    let elemDefault: IAnex;
    let expectedResult: IAnex | IAnex[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(AnexService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        sifra_postupka: 0,
        sifra_ponude: 0,
        atc: 'AAAAAAA',
        inn: 'AAAAAAA',
        zasticeni_naziv: 'AAAAAAA',
        farmaceutski_oblik_lijeka: 'AAAAAAA',
        jacina_lijeka: 'AAAAAAA',
        pakovanje: 'AAAAAAA',
        trazena_kolicina: 0,
        procijenjena_vrijednost: 0,
        rok_isporuke: 0,
        naziv_ponudjaca: 'AAAAAAA',
        naziv_proizvodjaca: 'AAAAAAA',
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

      it('should create a Anex', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Anex()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Anex', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            sifra_postupka: 1,
            sifra_ponude: 1,
            atc: 'BBBBBB',
            inn: 'BBBBBB',
            zasticeni_naziv: 'BBBBBB',
            farmaceutski_oblik_lijeka: 'BBBBBB',
            jacina_lijeka: 'BBBBBB',
            pakovanje: 'BBBBBB',
            trazena_kolicina: 1,
            procijenjena_vrijednost: 1,
            rok_isporuke: 1,
            naziv_ponudjaca: 'BBBBBB',
            naziv_proizvodjaca: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Anex', () => {
        const patchObject = Object.assign(
          {
            sifra_ponude: 1,
            zasticeni_naziv: 'BBBBBB',
            jacina_lijeka: 'BBBBBB',
            trazena_kolicina: 1,
            procijenjena_vrijednost: 1,
            rok_isporuke: 1,
          },
          new Anex()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Anex', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            sifra_postupka: 1,
            sifra_ponude: 1,
            atc: 'BBBBBB',
            inn: 'BBBBBB',
            zasticeni_naziv: 'BBBBBB',
            farmaceutski_oblik_lijeka: 'BBBBBB',
            jacina_lijeka: 'BBBBBB',
            pakovanje: 'BBBBBB',
            trazena_kolicina: 1,
            procijenjena_vrijednost: 1,
            rok_isporuke: 1,
            naziv_ponudjaca: 'BBBBBB',
            naziv_proizvodjaca: 'BBBBBB',
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

      it('should delete a Anex', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addAnexToCollectionIfMissing', () => {
        it('should add a Anex to an empty array', () => {
          const anex: IAnex = { id: 123 };
          expectedResult = service.addAnexToCollectionIfMissing([], anex);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(anex);
        });

        it('should not add a Anex to an array that contains it', () => {
          const anex: IAnex = { id: 123 };
          const anexCollection: IAnex[] = [
            {
              ...anex,
            },
            { id: 456 },
          ];
          expectedResult = service.addAnexToCollectionIfMissing(anexCollection, anex);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Anex to an array that doesn't contain it", () => {
          const anex: IAnex = { id: 123 };
          const anexCollection: IAnex[] = [{ id: 456 }];
          expectedResult = service.addAnexToCollectionIfMissing(anexCollection, anex);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(anex);
        });

        it('should add only unique Anex to an array', () => {
          const anexArray: IAnex[] = [{ id: 123 }, { id: 456 }, { id: 22345 }];
          const anexCollection: IAnex[] = [{ id: 123 }];
          expectedResult = service.addAnexToCollectionIfMissing(anexCollection, ...anexArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const anex: IAnex = { id: 123 };
          const anex2: IAnex = { id: 456 };
          expectedResult = service.addAnexToCollectionIfMissing([], anex, anex2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(anex);
          expect(expectedResult).toContain(anex2);
        });

        it('should accept null and undefined values', () => {
          const anex: IAnex = { id: 123 };
          expectedResult = service.addAnexToCollectionIfMissing([], null, anex, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(anex);
        });

        it('should return initial array if no Anex is added', () => {
          const anexCollection: IAnex[] = [{ id: 123 }];
          expectedResult = service.addAnexToCollectionIfMissing(anexCollection, undefined, null);
          expect(expectedResult).toEqual(anexCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
