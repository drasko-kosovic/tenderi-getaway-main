import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAnex } from '../anex.model';
import { AnexService } from '../service/anex.service';

@Component({
  templateUrl: './anex-delete-dialog.component.html',
})
export class AnexDeleteDialogComponent {
  anex?: IAnex;

  constructor(protected anexService: AnexService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.anexService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
