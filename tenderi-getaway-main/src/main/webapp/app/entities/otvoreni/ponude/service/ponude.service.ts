import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPonude, getPonudeIdentifier } from '../ponude.model';

export type EntityResponseType = HttpResponse<IPonude>;
export type EntityArrayResponseType = HttpResponse<IPonude[]>;

@Injectable({ providedIn: 'root' })
export class PonudeService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/ponudes', 'otvoreni');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(ponude: IPonude): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ponude);
    return this.http
      .post<IPonude>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(ponude: IPonude): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ponude);
    return this.http
      .put<IPonude>(`${this.resourceUrl}/${getPonudeIdentifier(ponude) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(ponude: IPonude): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ponude);
    return this.http
      .patch<IPonude>(`${this.resourceUrl}/${getPonudeIdentifier(ponude) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPonude>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPonude[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPonudeToCollectionIfMissing(ponudeCollection: IPonude[], ...ponudesToCheck: (IPonude | null | undefined)[]): IPonude[] {
    const ponudes: IPonude[] = ponudesToCheck.filter(isPresent);
    if (ponudes.length > 0) {
      const ponudeCollectionIdentifiers = ponudeCollection.map(ponudeItem => getPonudeIdentifier(ponudeItem)!);
      const ponudesToAdd = ponudes.filter(ponudeItem => {
        const ponudeIdentifier = getPonudeIdentifier(ponudeItem);
        if (ponudeIdentifier == null || ponudeCollectionIdentifiers.includes(ponudeIdentifier)) {
          return false;
        }
        ponudeCollectionIdentifiers.push(ponudeIdentifier);
        return true;
      });
      return [...ponudesToAdd, ...ponudeCollection];
    }
    return ponudeCollection;
  }

  protected convertDateFromClient(ponude: IPonude): IPonude {
    return Object.assign({}, ponude, {
      datumPonude: ponude.datumPonude?.isValid() ? ponude.datumPonude.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datumPonude = res.body.datumPonude ? dayjs(res.body.datumPonude) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((ponude: IPonude) => {
        ponude.datumPonude = ponude.datumPonude ? dayjs(ponude.datumPonude) : undefined;
      });
    }
    return res;
  }
}
