jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IViewPrvorangirani, ViewPrvorangirani } from '../view-prvorangirani.model';
import { ViewPrvorangiraniService } from '../service/view-prvorangirani.service';

import { ViewPrvorangiraniRoutingResolveService } from './view-prvorangirani-routing-resolve.service';

describe('Service Tests', () => {
  describe('ViewPrvorangirani routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ViewPrvorangiraniRoutingResolveService;
    let service: ViewPrvorangiraniService;
    let resultViewPrvorangirani: IViewPrvorangirani | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ViewPrvorangiraniRoutingResolveService);
      service = TestBed.inject(ViewPrvorangiraniService);
      resultViewPrvorangirani = undefined;
    });

    describe('resolve', () => {
      it('should return IViewPrvorangirani returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultViewPrvorangirani = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultViewPrvorangirani).toEqual({ id: 123 });
      });

      it('should return new IViewPrvorangirani if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultViewPrvorangirani = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultViewPrvorangirani).toEqual(new ViewPrvorangirani());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ViewPrvorangirani })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultViewPrvorangirani = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultViewPrvorangirani).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
