import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { NarucilacComponent } from './list/narucilac.component';
import { NarucilacDetailComponent } from './detail/narucilac-detail.component';
import { NarucilacUpdateComponent } from './update/narucilac-update.component';
import { NarucilacDeleteDialogComponent } from './delete/narucilac-delete-dialog.component';
import { NarucilacRoutingModule } from './route/narucilac-routing.module';

@NgModule({
  imports: [SharedModule, NarucilacRoutingModule],
  declarations: [NarucilacComponent, NarucilacDetailComponent, NarucilacUpdateComponent, NarucilacDeleteDialogComponent],
  entryComponents: [NarucilacDeleteDialogComponent],
})
export class OtvoreniNarucilacModule {}
