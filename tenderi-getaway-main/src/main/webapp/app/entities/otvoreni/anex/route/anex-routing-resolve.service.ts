import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAnex, Anex } from '../anex.model';
import { AnexService } from '../service/anex.service';

@Injectable({ providedIn: 'root' })
export class AnexRoutingResolveService implements Resolve<IAnex> {
  constructor(protected service: AnexService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAnex> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((anex: HttpResponse<Anex>) => {
          if (anex.body) {
            return of(anex.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Anex());
  }
}
