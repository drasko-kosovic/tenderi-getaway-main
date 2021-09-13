import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INarucilac } from '../narucilac.model';

@Component({
  selector: 'jhi-narucilac-detail',
  templateUrl: './narucilac-detail.component.html',
})
export class NarucilacDetailComponent implements OnInit {
  narucilac: INarucilac | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ narucilac }) => {
      this.narucilac = narucilac;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
