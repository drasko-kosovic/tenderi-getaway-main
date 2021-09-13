import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IViewPrvorangirani } from '../view-prvorangirani.model';
import { ViewPrvorangiraniService } from '../service/view-prvorangirani.service';

@Component({
  selector: 'jhi-view-prvorangirani',
  templateUrl: './view-prvorangirani.component.html',
})
export class ViewPrvorangiraniComponent implements OnInit {
  viewPrvorangiranis?: IViewPrvorangirani[];
  isLoading = false;

  constructor(protected viewPrvorangiraniService: ViewPrvorangiraniService) {}

  loadAll(): void {
    this.isLoading = true;

    this.viewPrvorangiraniService.query().subscribe(
      (res: HttpResponse<IViewPrvorangirani[]>) => {
        this.isLoading = false;
        this.viewPrvorangiranis = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IViewPrvorangirani): number {
    return item.id!;
  }
}
