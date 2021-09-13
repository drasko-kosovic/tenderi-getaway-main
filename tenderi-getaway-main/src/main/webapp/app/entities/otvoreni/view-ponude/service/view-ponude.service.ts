import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IViewPonude, getViewPonudeIdentifier } from '../view-ponude.model';

export type EntityResponseType = HttpResponse<IViewPonude>;
export type EntityArrayResponseType = HttpResponse<IViewPonude[]>;

@Injectable({ providedIn: 'root' })
export class ViewPonudeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/view-ponudes', 'otvoreni');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IViewPonude>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IViewPonude[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addViewPonudeToCollectionIfMissing(
    viewPonudeCollection: IViewPonude[],
    ...viewPonudesToCheck: (IViewPonude | null | undefined)[]
  ): IViewPonude[] {
    const viewPonudes: IViewPonude[] = viewPonudesToCheck.filter(isPresent);
    if (viewPonudes.length > 0) {
      const viewPonudeCollectionIdentifiers = viewPonudeCollection.map(viewPonudeItem => getViewPonudeIdentifier(viewPonudeItem)!);
      const viewPonudesToAdd = viewPonudes.filter(viewPonudeItem => {
        const viewPonudeIdentifier = getViewPonudeIdentifier(viewPonudeItem);
        if (viewPonudeIdentifier == null || viewPonudeCollectionIdentifiers.includes(viewPonudeIdentifier)) {
          return false;
        }
        viewPonudeCollectionIdentifiers.push(viewPonudeIdentifier);
        return true;
      });
      return [...viewPonudesToAdd, ...viewPonudeCollection];
    }
    return viewPonudeCollection;
  }

  protected convertDateFromClient(viewPonude: IViewPonude): IViewPonude {
    return Object.assign({}, viewPonude, {
      datumPonude: viewPonude.datumPonude?.isValid() ? viewPonude.datumPonude.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((viewPonude: IViewPonude) => {
        viewPonude.datumPonude = viewPonude.datumPonude ? dayjs(viewPonude.datumPonude) : undefined;
      });
    }
    return res;
  }
}
