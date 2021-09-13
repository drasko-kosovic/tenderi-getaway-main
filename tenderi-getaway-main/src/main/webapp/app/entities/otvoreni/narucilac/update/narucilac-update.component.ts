import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { INarucilac, Narucilac } from '../narucilac.model';
import { NarucilacService } from '../service/narucilac.service';

@Component({
  selector: 'jhi-narucilac-update',
  templateUrl: './narucilac-update.component.html',
})
export class NarucilacUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    naziv: [],
    racun: [],
    telefon: [],
    pib: [],
    pdv: [],
    odgovornoLiceNarucioca: [],
    email: [],
    adresa: [],
  });

  constructor(protected narucilacService: NarucilacService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ narucilac }) => {
      this.updateForm(narucilac);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const narucilac = this.createFromForm();
    if (narucilac.id !== undefined) {
      this.subscribeToSaveResponse(this.narucilacService.update(narucilac));
    } else {
      this.subscribeToSaveResponse(this.narucilacService.create(narucilac));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INarucilac>>): void {
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

  protected updateForm(narucilac: INarucilac): void {
    this.editForm.patchValue({
      id: narucilac.id,
      naziv: narucilac.naziv,
      racun: narucilac.racun,
      telefon: narucilac.telefon,
      pib: narucilac.pib,
      pdv: narucilac.pdv,
      odgovornoLiceNarucioca: narucilac.odgovornoLiceNarucioca,
      email: narucilac.email,
      adresa: narucilac.adresa,
    });
  }

  protected createFromForm(): INarucilac {
    return {
      ...new Narucilac(),
      id: this.editForm.get(['id'])!.value,
      naziv: this.editForm.get(['naziv'])!.value,
      racun: this.editForm.get(['racun'])!.value,
      telefon: this.editForm.get(['telefon'])!.value,
      pib: this.editForm.get(['pib'])!.value,
      pdv: this.editForm.get(['pdv'])!.value,
      odgovornoLiceNarucioca: this.editForm.get(['odgovornoLiceNarucioca'])!.value,
      email: this.editForm.get(['email'])!.value,
      adresa: this.editForm.get(['adresa'])!.value,
    };
  }
}
