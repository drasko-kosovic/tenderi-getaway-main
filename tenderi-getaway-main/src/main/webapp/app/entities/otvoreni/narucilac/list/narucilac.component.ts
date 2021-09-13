import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INarucilac } from '../narucilac.model';
import { NarucilacService } from '../service/narucilac.service';
import { NarucilacDeleteDialogComponent } from '../delete/narucilac-delete-dialog.component';

@Component({
  selector: 'jhi-narucilac',
  templateUrl: './narucilac.component.html',
})
export class NarucilacComponent implements OnInit {
  narucilacs?: INarucilac[];
  isLoading = false;

  constructor(protected narucilacService: NarucilacService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.narucilacService.query().subscribe(
      (res: HttpResponse<INarucilac[]>) => {
        this.isLoading = false;
        this.narucilacs = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: INarucilac): number {
    return item.id!;
  }

  delete(narucilac: INarucilac): void {
    const modalRef = this.modalService.open(NarucilacDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.narucilac = narucilac;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
