import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAnex } from '../anex.model';

@Component({
  selector: 'jhi-anex-detail',
  templateUrl: './anex-detail.component.html',
})
export class AnexDetailComponent implements OnInit {
  anex: IAnex | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ anex }) => {
      this.anex = anex;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
