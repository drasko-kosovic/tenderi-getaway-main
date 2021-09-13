import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IViewPrvorangirani, getViewPrvorangiraniIdentifier } from '../view-prvorangirani.model';

export type EntityResponseType = HttpResponse<IViewPrvorangirani>;
export type EntityArrayResponseType = HttpResponse<IViewPrvorangirani[]>;

@Injectable({ providedIn: 'root' })
export class ViewPrvorangiraniService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/view-prvorangiranis', 'otvoreni');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IViewPrvorangirani>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IViewPrvorangirani[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  addViewPrvorangiraniToCollectionIfMissing(
    viewPrvorangiraniCollection: IViewPrvorangirani[],
    ...viewPrvorangiranisToCheck: (IViewPrvorangirani | null | undefined)[]
  ): IViewPrvorangirani[] {
    const viewPrvorangiranis: IViewPrvorangirani[] = viewPrvorangiranisToCheck.filter(isPresent);
    if (viewPrvorangiranis.length > 0) {
      const viewPrvorangiraniCollectionIdentifiers = viewPrvorangiraniCollection.map(
        viewPrvorangiraniItem => getViewPrvorangiraniIdentifier(viewPrvorangiraniItem)!
      );
      const viewPrvorangiranisToAdd = viewPrvorangiranis.filter(viewPrvorangiraniItem => {
        const viewPrvorangiraniIdentifier = getViewPrvorangiraniIdentifier(viewPrvorangiraniItem);
        if (viewPrvorangiraniIdentifier == null || viewPrvorangiraniCollectionIdentifiers.includes(viewPrvorangiraniIdentifier)) {
          return false;
        }
        viewPrvorangiraniCollectionIdentifiers.push(viewPrvorangiraniIdentifier);
        return true;
      });
      return [...viewPrvorangiranisToAdd, ...viewPrvorangiraniCollection];
    }
    return viewPrvorangiraniCollection;
  }
}
