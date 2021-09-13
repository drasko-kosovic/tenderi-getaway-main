import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INarucilac, getNarucilacIdentifier } from '../narucilac.model';

export type EntityResponseType = HttpResponse<INarucilac>;
export type EntityArrayResponseType = HttpResponse<INarucilac[]>;

@Injectable({ providedIn: 'root' })
export class NarucilacService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/narucilacs', 'otvoreni');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(narucilac: INarucilac): Observable<EntityResponseType> {
    return this.http.post<INarucilac>(this.resourceUrl, narucilac, { observe: 'response' });
  }

  update(narucilac: INarucilac): Observable<EntityResponseType> {
    return this.http.put<INarucilac>(`${this.resourceUrl}/${getNarucilacIdentifier(narucilac) as number}`, narucilac, {
      observe: 'response',
    });
  }

  partialUpdate(narucilac: INarucilac): Observable<EntityResponseType> {
    return this.http.patch<INarucilac>(`${this.resourceUrl}/${getNarucilacIdentifier(narucilac) as number}`, narucilac, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INarucilac>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INarucilac[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addNarucilacToCollectionIfMissing(
    narucilacCollection: INarucilac[],
    ...narucilacsToCheck: (INarucilac | null | undefined)[]
  ): INarucilac[] {
    const narucilacs: INarucilac[] = narucilacsToCheck.filter(isPresent);
    if (narucilacs.length > 0) {
      const narucilacCollectionIdentifiers = narucilacCollection.map(narucilacItem => getNarucilacIdentifier(narucilacItem)!);
      const narucilacsToAdd = narucilacs.filter(narucilacItem => {
        const narucilacIdentifier = getNarucilacIdentifier(narucilacItem);
        if (narucilacIdentifier == null || narucilacCollectionIdentifiers.includes(narucilacIdentifier)) {
          return false;
        }
        narucilacCollectionIdentifiers.push(narucilacIdentifier);
        return true;
      });
      return [...narucilacsToAdd, ...narucilacCollection];
    }
    return narucilacCollection;
  }
}
