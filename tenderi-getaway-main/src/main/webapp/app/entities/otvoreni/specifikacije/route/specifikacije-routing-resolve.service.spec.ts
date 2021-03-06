jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ISpecifikacije, Specifikacije } from '../specifikacije.model';
import { SpecifikacijeService } from '../service/specifikacije.service';

import { SpecifikacijeRoutingResolveService } from './specifikacije-routing-resolve.service';

describe('Service Tests', () => {
  describe('Specifikacije routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: SpecifikacijeRoutingResolveService;
    let service: SpecifikacijeService;
    let resultSpecifikacije: ISpecifikacije | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(SpecifikacijeRoutingResolveService);
      service = TestBed.inject(SpecifikacijeService);
      resultSpecifikacije = undefined;
    });

    describe('resolve', () => {
      it('should return ISpecifikacije returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSpecifikacije = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultSpecifikacije).toEqual({ id: 123 });
      });

      it('should return new ISpecifikacije if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSpecifikacije = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultSpecifikacije).toEqual(new Specifikacije());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Specifikacije })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSpecifikacije = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultSpecifikacije).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
