jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IPostupci, Postupci } from '../postupci.model';
import { PostupciService } from '../service/postupci.service';

import { PostupciRoutingResolveService } from './postupci-routing-resolve.service';

describe('Service Tests', () => {
  describe('Postupci routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: PostupciRoutingResolveService;
    let service: PostupciService;
    let resultPostupci: IPostupci | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(PostupciRoutingResolveService);
      service = TestBed.inject(PostupciService);
      resultPostupci = undefined;
    });

    describe('resolve', () => {
      it('should return IPostupci returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPostupci = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPostupci).toEqual({ id: 123 });
      });

      it('should return new IPostupci if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPostupci = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultPostupci).toEqual(new Postupci());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPostupci = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPostupci).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
