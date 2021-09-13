import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IViewPonude } from '../view-ponude.model';
import { ViewPonudeService } from '../service/view-ponude.service';

@Component({
  selector: 'jhi-view-ponude',
  templateUrl: './view-ponude.component.html',
})
export class ViewPonudeComponent implements OnInit {
  viewPonudes?: IViewPonude[];
  isLoading = false;

  constructor(protected viewPonudeService: ViewPonudeService) {}

  loadAll(): void {
    this.isLoading = true;

    this.viewPonudeService.query().subscribe(
      (res: HttpResponse<IViewPonude[]>) => {
        this.isLoading = false;
        this.viewPonudes = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IViewPonude): number {
    return item.id!;
  }
}
