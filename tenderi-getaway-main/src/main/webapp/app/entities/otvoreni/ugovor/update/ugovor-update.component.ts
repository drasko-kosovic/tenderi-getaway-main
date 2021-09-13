import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IUgovor, Ugovor } from '../ugovor.model';
import { UgovorService } from '../service/ugovor.service';

@Component({
  selector: 'jhi-ugovor-update',
  templateUrl: './ugovor-update.component.html',
})
export class UgovorUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    brojUgovora: [],
    datumUgovora: [],
    brojOdluke: [],
    datumOdluke: [],
    iznosUgovoraBezPdf: [],
    sifraPostupka: [],
    sifraPonude: [],
  });

  constructor(protected ugovorService: UgovorService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ugovor }) => {
      this.updateForm(ugovor);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ugovor = this.createFromForm();
    if (ugovor.id !== undefined) {
      this.subscribeToSaveResponse(this.ugovorService.update(ugovor));
    } else {
      this.subscribeToSaveResponse(this.ugovorService.create(ugovor));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUgovor>>): void {
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

  protected updateForm(ugovor: IUgovor): void {
    this.editForm.patchValue({
      id: ugovor.id,
      brojUgovora: ugovor.brojUgovora,
      datumUgovora: ugovor.datumUgovora,
      brojOdluke: ugovor.brojOdluke,
      datumOdluke: ugovor.datumOdluke,
      iznosUgovoraBezPdf: ugovor.iznosUgovoraBezPdf,
      sifraPostupka: ugovor.sifraPostupka,
      sifraPonude: ugovor.sifraPonude,
    });
  }

  protected createFromForm(): IUgovor {
    return {
      ...new Ugovor(),
      id: this.editForm.get(['id'])!.value,
      brojUgovora: this.editForm.get(['brojUgovora'])!.value,
      datumUgovora: this.editForm.get(['datumUgovora'])!.value,
      brojOdluke: this.editForm.get(['brojOdluke'])!.value,
      datumOdluke: this.editForm.get(['datumOdluke'])!.value,
      iznosUgovoraBezPdf: this.editForm.get(['iznosUgovoraBezPdf'])!.value,
      sifraPostupka: this.editForm.get(['sifraPostupka'])!.value,
      sifraPonude: this.editForm.get(['sifraPonude'])!.value,
    };
  }
}
