import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { HvalePonudeComponent } from './list/hvale-ponude.component';
import { HvalePonudeDetailComponent } from './detail/hvale-ponude-detail.component';
import { HvalePonudeUpdateComponent } from './update/hvale-ponude-update.component';
import { HvalePonudeDeleteDialogComponent } from './delete/hvale-ponude-delete-dialog.component';
import { HvalePonudeRoutingModule } from './route/hvale-ponude-routing.module';

@NgModule({
  imports: [SharedModule, HvalePonudeRoutingModule],
  declarations: [HvalePonudeComponent, HvalePonudeDetailComponent, HvalePonudeUpdateComponent, HvalePonudeDeleteDialogComponent],
  entryComponents: [HvalePonudeDeleteDialogComponent],
})
export class OtvoreniHvalePonudeModule {}
