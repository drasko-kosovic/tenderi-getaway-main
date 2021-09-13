import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IViewPrvorangirani, ViewPrvorangirani } from '../view-prvorangirani.model';
import { ViewPrvorangiraniService } from '../service/view-prvorangirani.service';

@Injectable({ providedIn: 'root' })
export class ViewPrvorangiraniRoutingResolveService implements Resolve<IViewPrvorangirani> {
  constructor(protected service: ViewPrvorangiraniService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IViewPrvorangirani> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((viewPrvorangirani: HttpResponse<ViewPrvorangirani>) => {
          if (viewPrvorangirani.body) {
            return of(viewPrvorangirani.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ViewPrvorangirani());
  }
}
