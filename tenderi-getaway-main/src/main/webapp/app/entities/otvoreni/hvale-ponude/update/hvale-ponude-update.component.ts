import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IHvalePonude, HvalePonude } from '../hvale-ponude.model';
import { HvalePonudeService } from '../service/hvale-ponude.service';

@Component({
  selector: 'jhi-hvale-ponude-update',
  templateUrl: './hvale-ponude-update.component.html',
})
export class HvalePonudeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    sifraPostupka: [],
    brojPartije: [],
    inn: [],
    farmaceutskiOblikLijeka: [],
    pakovanje: [],
    trazenaKolicina: [],
    procijenjenaVrijednost: [],
  });

  constructor(protected hvalePonudeService: HvalePonudeService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hvalePonude }) => {
      this.updateForm(hvalePonude);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const hvalePonude = this.createFromForm();
    if (hvalePonude.id !== undefined) {
      this.subscribeToSaveResponse(this.hvalePonudeService.update(hvalePonude));
    } else {
      this.subscribeToSaveResponse(this.hvalePonudeService.create(hvalePonude));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHvalePonude>>): void {
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

  protected updateForm(hvalePonude: IHvalePonude): void {
    this.editForm.patchValue({
      id: hvalePonude.id,
      sifraPostupka: hvalePonude.sifraPostupka,
      brojPartije: hvalePonude.brojPartije,
      inn: hvalePonude.inn,
      farmaceutskiOblikLijeka: hvalePonude.farmaceutskiOblikLijeka,
      pakovanje: hvalePonude.pakovanje,
      trazenaKolicina: hvalePonude.trazenaKolicina,
      procijenjenaVrijednost: hvalePonude.procijenjenaVrijednost,
    });
  }

  protected createFromForm(): IHvalePonude {
    return {
      ...new HvalePonude(),
      id: this.editForm.get(['id'])!.value,
      sifraPostupka: this.editForm.get(['sifraPostupka'])!.value,
      brojPartije: this.editForm.get(['brojPartije'])!.value,
      inn: this.editForm.get(['inn'])!.value,
      farmaceutskiOblikLijeka: this.editForm.get(['farmaceutskiOblikLijeka'])!.value,
      pakovanje: this.editForm.get(['pakovanje'])!.value,
      trazenaKolicina: this.editForm.get(['trazenaKolicina'])!.value,
      procijenjenaVrijednost: this.editForm.get(['procijenjenaVrijednost'])!.value,
    };
  }
}
