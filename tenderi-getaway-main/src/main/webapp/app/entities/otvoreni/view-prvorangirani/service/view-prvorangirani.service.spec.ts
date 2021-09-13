import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IViewPrvorangirani, ViewPrvorangirani } from '../view-prvorangirani.model';

import { ViewPrvorangiraniService } from './view-prvorangirani.service';

describe('Service Tests', () => {
  describe('ViewPrvorangirani Service', () => {
    let service: ViewPrvorangiraniService;
    let httpMock: HttpTestingController;
    let elemDefault: IViewPrvorangirani;
    let expectedResult: IViewPrvorangirani | IViewPrvorangirani[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ViewPrvorangiraniService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        sifraPostupka: 0,
        sifraPonude: 0,
        brojPartije: 0,
        atc: 'AAAAAAA',
        inn: 'AAAAAAA',
        zasticeniNaziv: 'AAAAAAA',
        farmaceutskiOblikLijeka: 'AAAAAAA',
        jacinaLijeka: 'AAAAAAA',
        pakovanje: 'AAAAAAA',
        trazenaKolicina: 0,
        procijenjenaVrijednost: 0,
        ponudjenaVrijednost: 0,
        rokIsporuke: 0,
        nazivProizvodjaca: 'AAAAAAA',
        nazivPonudjaca: 'AAAAAAA',
        bodCijena: 0,
        bodRok: 0,
        bodUkupno: 0,
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

      it('should return a list of ViewPrvorangirani', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            sifraPostupka: 1,
            sifraPonude: 1,
            brojPartije: 1,
            atc: 'BBBBBB',
            inn: 'BBBBBB',
            zasticeniNaziv: 'BBBBBB',
            farmaceutskiOblikLijeka: 'BBBBBB',
            jacinaLijeka: 'BBBBBB',
            pakovanje: 'BBBBBB',
            trazenaKolicina: 1,
            procijenjenaVrijednost: 1,
            ponudjenaVrijednost: 1,
            rokIsporuke: 1,
            nazivProizvodjaca: 'BBBBBB',
            nazivPonudjaca: 'BBBBBB',
            bodCijena: 1,
            bodRok: 1,
            bodUkupno: 1,
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

      describe('addViewPrvorangiraniToCollectionIfMissing', () => {
        it('should add a ViewPrvorangirani to an empty array', () => {
          const viewPrvorangirani: IViewPrvorangirani = { id: 123 };
          expectedResult = service.addViewPrvorangiraniToCollectionIfMissing([], viewPrvorangirani);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(viewPrvorangirani);
        });

        it('should not add a ViewPrvorangirani to an array that contains it', () => {
          const viewPrvorangirani: IViewPrvorangirani = { id: 123 };
          const viewPrvorangiraniCollection: IViewPrvorangirani[] = [
            {
              ...viewPrvorangirani,
            },
            { id: 456 },
          ];
          expectedResult = service.addViewPrvorangiraniToCollectionIfMissing(viewPrvorangiraniCollection, viewPrvorangirani);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a ViewPrvorangirani to an array that doesn't contain it", () => {
          const viewPrvorangirani: IViewPrvorangirani = { id: 123 };
          const viewPrvorangiraniCollection: IViewPrvorangirani[] = [{ id: 456 }];
          expectedResult = service.addViewPrvorangiraniToCollectionIfMissing(viewPrvorangiraniCollection, viewPrvorangirani);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(viewPrvorangirani);
        });

        it('should add only unique ViewPrvorangirani to an array', () => {
          const viewPrvorangiraniArray: IViewPrvorangirani[] = [{ id: 123 }, { id: 456 }, { id: 55155 }];
          const viewPrvorangiraniCollection: IViewPrvorangirani[] = [{ id: 123 }];
          expectedResult = service.addViewPrvorangiraniToCollectionIfMissing(viewPrvorangiraniCollection, ...viewPrvorangiraniArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const viewPrvorangirani: IViewPrvorangirani = { id: 123 };
          const viewPrvorangirani2: IViewPrvorangirani = { id: 456 };
          expectedResult = service.addViewPrvorangiraniToCollectionIfMissing([], viewPrvorangirani, viewPrvorangirani2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(viewPrvorangirani);
          expect(expectedResult).toContain(viewPrvorangirani2);
        });

        it('should accept null and undefined values', () => {
          const viewPrvorangirani: IViewPrvorangirani = { id: 123 };
          expectedResult = service.addViewPrvorangiraniToCollectionIfMissing([], null, viewPrvorangirani, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(viewPrvorangirani);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
