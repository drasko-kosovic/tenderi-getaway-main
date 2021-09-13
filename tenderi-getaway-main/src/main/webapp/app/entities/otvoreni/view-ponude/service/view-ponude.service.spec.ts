import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IViewPonude } from '../view-ponude.model';

import { ViewPonudeService } from './view-ponude.service';

describe('Service Tests', () => {
  describe('ViewPonude Service', () => {
    let service: ViewPonudeService;
    let httpMock: HttpTestingController;
    let elemDefault: IViewPonude;
    let expectedResult: IViewPonude | IViewPonude[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ViewPonudeService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        sifraPostupka: 0,
        sifraPonude: 0,
        brojPartije: 0,
        sifraPonudjaca: 0,
        nazivPonudjaca: 'AAAAAAA',
        nazivProizvodjaca: 'AAAAAAA',
        zasticeniNaziv: 'AAAAAAA',
        ponudjenaVrijednost: 0,
        rokIsporuke: 0,
        selected: false,
        datumPonude: currentDate,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            datumPonude: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should return a list of ViewPonude', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            sifraPostupka: 1,
            sifraPonude: 1,
            brojPartije: 1,
            sifraPonudjaca: 1,
            nazivPonudjaca: 'BBBBBB',
            nazivProizvodjaca: 'BBBBBB',
            zasticeniNaziv: 'BBBBBB',
            ponudjenaVrijednost: 1,
            rokIsporuke: 1,
            selected: true,
            datumPonude: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datumPonude: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      describe('addViewPonudeToCollectionIfMissing', () => {
        it('should add a ViewPonude to an empty array', () => {
          const viewPonude: IViewPonude = { id: 123 };
          expectedResult = service.addViewPonudeToCollectionIfMissing([], viewPonude);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(viewPonude);
        });

        it('should not add a ViewPonude to an array that contains it', () => {
          const viewPonude: IViewPonude = { id: 123 };
          const viewPonudeCollection: IViewPonude[] = [
            {
              ...viewPonude,
            },
            { id: 456 },
          ];
          expectedResult = service.addViewPonudeToCollectionIfMissing(viewPonudeCollection, viewPonude);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a ViewPonude to an array that doesn't contain it", () => {
          const viewPonude: IViewPonude = { id: 123 };
          const viewPonudeCollection: IViewPonude[] = [{ id: 456 }];
          expectedResult = service.addViewPonudeToCollectionIfMissing(viewPonudeCollection, viewPonude);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(viewPonude);
        });

        it('should add only unique ViewPonude to an array', () => {
          const viewPonudeArray: IViewPonude[] = [{ id: 123 }, { id: 456 }, { id: 98471 }];
          const viewPonudeCollection: IViewPonude[] = [{ id: 123 }];
          expectedResult = service.addViewPonudeToCollectionIfMissing(viewPonudeCollection, ...viewPonudeArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const viewPonude: IViewPonude = { id: 123 };
          const viewPonude2: IViewPonude = { id: 456 };
          expectedResult = service.addViewPonudeToCollectionIfMissing([], viewPonude, viewPonude2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(viewPonude);
          expect(expectedResult).toContain(viewPonude2);
        });

        it('should accept null and undefined values', () => {
          const viewPonude: IViewPonude = { id: 123 };
          expectedResult = service.addViewPonudeToCollectionIfMissing([], null, viewPonude, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(viewPonude);
        });

        it('should return initial array if no ViewPonude is added', () => {
          const viewPonudeCollection: IViewPonude[] = [{ id: 123 }];
          expectedResult = service.addViewPonudeToCollectionIfMissing(viewPonudeCollection, undefined, null);
          expect(expectedResult).toEqual(viewPonudeCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
