jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IPonude, Ponude } from '../ponude.model';
import { PonudeService } from '../service/ponude.service';

import { PonudeRoutingResolveService } from './ponude-routing-resolve.service';

describe('Service Tests', () => {
  describe('Ponude routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: PonudeRoutingResolveService;
    let service: PonudeService;
    let resultPonude: IPonude | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(PonudeRoutingResolveService);
      service = TestBed.inject(PonudeService);
      resultPonude = undefined;
    });

    describe('resolve', () => {
      it('should return IPonude returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPonude = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPonude).toEqual({ id: 123 });
      });

      it('should return new IPonude if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPonude = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultPonude).toEqual(new Ponude());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Ponude })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPonude = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPonude).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
