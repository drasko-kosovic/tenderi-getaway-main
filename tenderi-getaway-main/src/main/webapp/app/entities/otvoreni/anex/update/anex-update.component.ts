import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IAnex, Anex } from '../anex.model';
import { AnexService } from '../service/anex.service';

@Component({
  selector: 'jhi-anex-update',
  templateUrl: './anex-update.component.html',
})
export class AnexUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    sifra_postupka: [],
    sifra_ponude: [],
    atc: [],
    inn: [],
    zasticeni_naziv: [],
    farmaceutski_oblik_lijeka: [],
    jacina_lijeka: [],
    pakovanje: [],
    trazena_kolicina: [],
    procijenjena_vrijednost: [],
    rok_isporuke: [],
    naziv_ponudjaca: [],
    naziv_proizvodjaca: [],
  });

  constructor(protected anexService: AnexService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ anex }) => {
      this.updateForm(anex);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const anex = this.createFromForm();
    if (anex.id !== undefined) {
      this.subscribeToSaveResponse(this.anexService.update(anex));
    } else {
      this.subscribeToSaveResponse(this.anexService.create(anex));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnex>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(anex: IAnex): void {
    this.editForm.patchValue({
      id: anex.id,
      sifra_postupka: anex.sifra_postupka,
      sifra_ponude: anex.sifra_ponude,
      atc: anex.atc,
      inn: anex.inn,
      zasticeni_naziv: anex.zasticeni_naziv,
      farmaceutski_oblik_lijeka: anex.farmaceutski_oblik_lijeka,
      jacina_lijeka: anex.jacina_lijeka,
      pakovanje: anex.pakovanje,
      trazena_kolicina: anex.trazena_kolicina,
      procijenjena_vrijednost: anex.procijenjena_vrijednost,
      rok_isporuke: anex.rok_isporuke,
      naziv_ponudjaca: anex.naziv_ponudjaca,
      naziv_proizvodjaca: anex.naziv_proizvodjaca,
    });
  }

  protected createFromForm(): IAnex {
    return {
      ...new Anex(),
      id: this.editForm.get(['id'])!.value,
      sifra_postupka: this.editForm.get(['sifra_postupka'])!.value,
      sifra_ponude: this.editForm.get(['sifra_ponude'])!.value,
      atc: this.editForm.get(['atc'])!.value,
      inn: this.editForm.get(['inn'])!.value,
      zasticeni_naziv: this.editForm.get(['zasticeni_naziv'])!.value,
      farmaceutski_oblik_lijeka: this.editForm.get(['farmaceutski_oblik_lijeka'])!.value,
      jacina_lijeka: this.editForm.get(['jacina_lijeka'])!.value,
      pakovanje: this.editForm.get(['pakovanje'])!.value,
      trazena_kolicina: this.editForm.get(['trazena_kolicina'])!.value,
      procijenjena_vrijednost: this.editForm.get(['procijenjena_vrijednost'])!.value,
      rok_isporuke: this.editForm.get(['rok_isporuke'])!.value,
      naziv_ponudjaca: this.editForm.get(['naziv_ponudjaca'])!.value,
      naziv_proizvodjaca: this.editForm.get(['naziv_proizvodjaca'])!.value,
    };
  }
}
