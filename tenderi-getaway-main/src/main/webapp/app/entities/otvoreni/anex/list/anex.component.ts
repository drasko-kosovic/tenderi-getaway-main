import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAnex } from '../anex.model';
import { AnexService } from '../service/anex.service';
import { AnexDeleteDialogComponent } from '../delete/anex-delete-dialog.component';

@Component({
  selector: 'jhi-anex',
  templateUrl: './anex.component.html',
})
export class AnexComponent implements OnInit {
  anexes?: IAnex[];
  isLoading = false;

  constructor(protected anexService: AnexService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.anexService.query().subscribe(
      (res: HttpResponse<IAnex[]>) => {
        this.isLoading = false;
        this.anexes = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IAnex): number {
    return item.id!;
  }

  delete(anex: IAnex): void {
    const modalRef = this.modalService.open(AnexDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.anex = anex;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
