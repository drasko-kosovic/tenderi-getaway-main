import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHvalePonude } from '../hvale-ponude.model';
import { HvalePonudeService } from '../service/hvale-ponude.service';
import { HvalePonudeDeleteDialogComponent } from '../delete/hvale-ponude-delete-dialog.component';

@Component({
  selector: 'jhi-hvale-ponude',
  templateUrl: './hvale-ponude.component.html',
})
export class HvalePonudeComponent implements OnInit {
  hvalePonudes?: IHvalePonude[];
  isLoading = false;

  constructor(protected hvalePonudeService: HvalePonudeService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.hvalePonudeService.query().subscribe(
      (res: HttpResponse<IHvalePonude[]>) => {
        this.isLoading = false;
        this.hvalePonudes = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IHvalePonude): number {
    return item.id!;
  }

  delete(hvalePonude: IHvalePonude): void {
    const modalRef = this.modalService.open(HvalePonudeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.hvalePonude = hvalePonude;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
