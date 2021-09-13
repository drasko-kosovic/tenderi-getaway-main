import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INarucilac, Narucilac } from '../narucilac.model';
import { NarucilacService } from '../service/narucilac.service';

@Injectable({ providedIn: 'root' })
export class NarucilacRoutingResolveService implements Resolve<INarucilac> {
  constructor(protected service: NarucilacService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INarucilac> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((narucilac: HttpResponse<Narucilac>) => {
          if (narucilac.body) {
            return of(narucilac.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Narucilac());
  }
}
