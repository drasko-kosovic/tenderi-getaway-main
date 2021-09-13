jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IAnex, Anex } from '../anex.model';
import { AnexService } from '../service/anex.service';

import { AnexRoutingResolveService } from './anex-routing-resolve.service';

describe('Service Tests', () => {
  describe('Anex routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: AnexRoutingResolveService;
    let service: AnexService;
    let resultAnex: IAnex | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(AnexRoutingResolveService);
      service = TestBed.inject(AnexService);
      resultAnex = undefined;
    });

    describe('resolve', () => {
      it('should return IAnex returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAnex = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAnex).toEqual({ id: 123 });
      });

      it('should return new IAnex if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAnex = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultAnex).toEqual(new Anex());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Anex })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAnex = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAnex).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
