import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPonude, Ponude } from '../ponude.model';
import { PonudeService } from '../service/ponude.service';

@Component({
  selector: 'jhi-ponude-update',
  templateUrl: './ponude-update.component.html',
})
export class PonudeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    sifraPonude: [null, [Validators.required]],
    sifraPostupka: [null, [Validators.required]],
    brojPartije: [null, [Validators.required]],
    nazivProizvodjaca: [],
    zasticeniNaziv: [],
    ponudjenaVrijednost: [],
    rokIsporuke: [],
    datumPonude: [],
    sifraPonudjaca: [],
    selected: [],
  });

  constructor(protected ponudeService: PonudeService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ponude }) => {
      this.updateForm(ponude);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ponude = this.createFromForm();
    if (ponude.id !== undefined) {
      this.subscribeToSaveResponse(this.ponudeService.update(ponude));
    } else {
      this.subscribeToSaveResponse(this.ponudeService.create(ponude));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPonude>>): void {
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

  protected updateForm(ponude: IPonude): void {
    this.editForm.patchValue({
      id: ponude.id,
      sifraPonude: ponude.sifraPonude,
      sifraPostupka: ponude.sifraPostupka,
      brojPartije: ponude.brojPartije,
      nazivProizvodjaca: ponude.nazivProizvodjaca,
      zasticeniNaziv: ponude.zasticeniNaziv,
      ponudjenaVrijednost: ponude.ponudjenaVrijednost,
      rokIsporuke: ponude.rokIsporuke,
      datumPonude: ponude.datumPonude,
      sifraPonudjaca: ponude.sifraPonudjaca,
      selected: ponude.selected,
    });
  }

  protected createFromForm(): IPonude {
    return {
      ...new Ponude(),
      id: this.editForm.get(['id'])!.value,
      sifraPonude: this.editForm.get(['sifraPonude'])!.value,
      sifraPostupka: this.editForm.get(['sifraPostupka'])!.value,
      brojPartije: this.editForm.get(['brojPartije'])!.value,
      nazivProizvodjaca: this.editForm.get(['nazivProizvodjaca'])!.value,
      zasticeniNaziv: this.editForm.get(['zasticeniNaziv'])!.value,
      ponudjenaVrijednost: this.editForm.get(['ponudjenaVrijednost'])!.value,
      rokIsporuke: this.editForm.get(['rokIsporuke'])!.value,
      datumPonude: this.editForm.get(['datumPonude'])!.value,
      sifraPonudjaca: this.editForm.get(['sifraPonudjaca'])!.value,
      selected: this.editForm.get(['selected'])!.value,
    };
  }
}
