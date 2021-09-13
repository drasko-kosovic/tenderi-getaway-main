import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IHvalePonude } from '../hvale-ponude.model';
import { HvalePonudeService } from '../service/hvale-ponude.service';

@Component({
  templateUrl: './hvale-ponude-delete-dialog.component.html',
})
export class HvalePonudeDeleteDialogComponent {
  hvalePonude?: IHvalePonude;

  constructor(protected hvalePonudeService: HvalePonudeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.hvalePonudeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
