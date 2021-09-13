import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { INarucilac } from '../narucilac.model';
import { NarucilacService } from '../service/narucilac.service';

@Component({
  templateUrl: './narucilac-delete-dialog.component.html',
})
export class NarucilacDeleteDialogComponent {
  narucilac?: INarucilac;

  constructor(protected narucilacService: NarucilacService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.narucilacService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
