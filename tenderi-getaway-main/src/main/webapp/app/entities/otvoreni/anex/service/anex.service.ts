import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAnex, getAnexIdentifier } from '../anex.model';

export type EntityResponseType = HttpResponse<IAnex>;
export type EntityArrayResponseType = HttpResponse<IAnex[]>;

@Injectable({ providedIn: 'root' })
export class AnexService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/anexes', 'otvoreni');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(anex: IAnex): Observable<EntityResponseType> {
    return this.http.post<IAnex>(this.resourceUrl, anex, { observe: 'response' });
  }

  update(anex: IAnex): Observable<EntityResponseType> {
    return this.http.put<IAnex>(`${this.resourceUrl}/${getAnexIdentifier(anex) as number}`, anex, { observe: 'response' });
  }

  partialUpdate(anex: IAnex): Observable<EntityResponseType> {
    return this.http.patch<IAnex>(`${this.resourceUrl}/${getAnexIdentifier(anex) as number}`, anex, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAnex>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAnex[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAnexToCollectionIfMissing(anexCollection: IAnex[], ...anexesToCheck: (IAnex | null | undefined)[]): IAnex[] {
    const anexes: IAnex[] = anexesToCheck.filter(isPresent);
    if (anexes.length > 0) {
      const anexCollectionIdentifiers = anexCollection.map(anexItem => getAnexIdentifier(anexItem)!);
      const anexesToAdd = anexes.filter(anexItem => {
        const anexIdentifier = getAnexIdentifier(anexItem);
        if (anexIdentifier == null || anexCollectionIdentifiers.includes(anexIdentifier)) {
          return false;
        }
        anexCollectionIdentifiers.push(anexIdentifier);
        return true;
      });
      return [...anexesToAdd, ...anexCollection];
    }
    return anexCollection;
  }
}
