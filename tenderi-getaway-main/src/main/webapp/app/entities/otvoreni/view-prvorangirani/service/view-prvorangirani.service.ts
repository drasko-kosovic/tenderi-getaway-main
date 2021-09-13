import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

import { IViewPrvorangirani} from '../view-prvorangirani.model';
import {IPonude} from "app/entities/otvoreni/ponude/ponude.model";

export type EntityResponseType = HttpResponse<IViewPrvorangirani>;
export type EntityArrayResponseType = HttpResponse<IViewPrvorangirani[]>;

@Injectable({ providedIn: 'root' })
export class ViewPrvorangiraniService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/view-prvorangiranis', 'otvoreni');
  public resourceUrlPostupak = this.applicationConfigService.getEndpointFor('api/prvorangirani', 'otvoreni');
  public resourceUrlPonude = this.applicationConfigService.getEndpointFor('api/prvorangirani-ponude', 'otvoreni');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}


  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IViewPrvorangirani>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findPostupak(sifraPostupka: number): any {
    return this.http.get<IViewPrvorangirani>(`${this.resourceUrlPostupak}/${sifraPostupka}`);
  }

  findPonude(sifraPonude: number): any {
    return this.http.get<IViewPrvorangirani>(`${this.resourceUrlPonude}/${sifraPonude}`);
  }

  getPrvorangiraniPonude(sifraPostupka: number, sifraPonude: number): Observable<IPonude[]> {
    const params = new HttpParams();
    params.set('sifraPostupka', String(sifraPostupka));
    params.set('sifraPonude', String(sifraPonude));

    return this.http.get<IPonude[]>(`${this.resourceUrlPostupak}?sifraPostupka=${sifraPostupka}&sifraPonude=${sifraPonude}`, { params });
  }
}
