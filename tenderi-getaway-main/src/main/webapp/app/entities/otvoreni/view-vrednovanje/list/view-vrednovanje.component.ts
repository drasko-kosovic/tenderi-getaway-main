import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IViewVrednovanje } from '../view-vrednovanje.model';
import { ViewVrednovanjeService } from '../service/view-vrednovanje.service';

@Component({
  selector: 'jhi-view-vrednovanje',
  templateUrl: './view-vrednovanje.component.html',
})
export class ViewVrednovanjeComponent implements OnInit {
  viewVrednovanjes?: IViewVrednovanje[];
  isLoading = false;

  constructor(protected viewVrednovanjeService: ViewVrednovanjeService) {}

  loadAll(): void {
    this.isLoading = true;

    this.viewVrednovanjeService.query().subscribe(
      (res: HttpResponse<IViewVrednovanje[]>) => {
        this.isLoading = false;
        this.viewVrednovanjes = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IViewVrednovanje): number {
    return item.id!;
  }
}
