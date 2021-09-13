import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { IUgovor, getUgovorIdentifier } from '../ugovor.model';
import { getPonudeIdentifier, IPonude } from 'app/entities/otvoreni/ponude/ponude.model';

export type EntityResponseType = HttpResponse<IUgovor>;
export type EntityArrayResponseType = HttpResponse<IUgovor[]>;

@Injectable({ providedIn: 'root' })
export class UgovorService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/ugovors','otvoreni');
  public resourceUrlSifraPostupka = this.applicationConfigService.getEndpointFor('api/ugovor','otvoreni');
  public resourceUrlUgovorPdf = this.applicationConfigService.getEndpointFor('api/report/ugovor/','otvoreni');
  public resourceUrlPdfPrvorangirani = this.applicationConfigService.getEndpointFor('api/report/prvorangirani','otvoreni');
  public resourceUrlPostupakPonudeeUgovor = this.applicationConfigService.getEndpointFor('api/prvorangirani/ugovor','otvoreni');
  // public resourceUrlPdfLocal1 = this.applicationConfigService.getEndpointFor('api/report/ugovor');
  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(ugovor: IUgovor): Observable<EntityResponseType> {
    return this.http.post<IUgovor>(this.resourceUrl, ugovor, { observe: 'response' });
  }

  update(ugovor: IUgovor): Observable<EntityResponseType> {
    return this.http.put<IUgovor>(`${this.resourceUrl}/${getPonudeIdentifier(ugovor) as number}`, ugovor, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUgovor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  findSiftraPostupak(sifra_postupka: number): any {
    return this.http.get<[IUgovor]>(`${this.resourceUrlSifraPostupka}/${sifra_postupka}`);
  }
  query(): Observable<EntityArrayResponseType> {
    return this.http.get<IUgovor[]>(this.resourceUrl, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  ponudjaciAll(): any {
    return this.http.get<IPonude[]>(this.resourceUrl);
  }
  getPrvorangiraniPonude(sifra_postupka: number, sifra_ponude: number): Observable<IPonude[]> {
    const params = new HttpParams();
    params.set('sifra_postupka', String(sifra_postupka));
    params.set('sifra_ponude', String(sifra_ponude));

    return this.http.get<IPonude[]>(
      `${this.resourceUrlPostupakPonudeeUgovor}?sifra_postupka=${sifra_postupka}&sifra_ponude=${sifra_ponude}`,
      {
        params,
      }
    );
  }
  printReportAnexiUgovor(sifra_postupka: number, sifra_ponude: number): any {
    const params = new HttpParams();
    params.set('sifra_postupka', String(sifra_postupka));
    params.set('sifra_ponude', String(sifra_ponude));

    return this.http.get<IPonude[]>(`${this.resourceUrlPdfPrvorangirani}?sifra_postupka=${sifra_postupka}&sifra_ponude=${sifra_ponude}`, {
      params,
      responseType: 'arraybuffer' as 'json',
    });
  }
  printReportServiceUgovor(brojUgovora: string): any {
    // const httpOptions = {
    //   responseType: 'arraybuffer' as 'json'
    //   // 'responseType'  : 'blob' as 'json'        //This also worked
    // };
    return this.http.get<[IUgovor]>(this.resourceUrlUgovorPdf + brojUgovora, {
      responseType: 'arraybuffer' as 'json',
      // 'responseType'  : 'blob' as 'json'        //This also worked
    });
  }
  addUgovorToCollectionIfMissing(ugovorCollection: IUgovor[], ...ugovorsToCheck: (IUgovor | null | undefined)[]): IUgovor[] {
    const ugovors: IUgovor[] = ugovorsToCheck.filter(isPresent);
    if (ugovors.length > 0) {
      const ugovorCollectionIdentifiers = ugovorCollection.map(ugovorItem => getUgovorIdentifier(ugovorItem)!);
      const ugovorsToAdd = ugovors.filter(ugovorItem => {
        const ugovorIdentifier = getUgovorIdentifier(ugovorItem);
        if (ugovorIdentifier == null || ugovorCollectionIdentifiers.includes(ugovorIdentifier)) {
          return false;
        }
        ugovorCollectionIdentifiers.push(ugovorIdentifier);
        return true;
      });
      return [...ugovorsToAdd, ...ugovorCollection];
    }
    return ugovorCollection;
  }
}
