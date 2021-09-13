import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AnexComponent } from './list/anex.component';
import { AnexDetailComponent } from './detail/anex-detail.component';
import { AnexUpdateComponent } from './update/anex-update.component';
import { AnexDeleteDialogComponent } from './delete/anex-delete-dialog.component';
import { AnexRoutingModule } from './route/anex-routing.module';

@NgModule({
  imports: [SharedModule, AnexRoutingModule],
  declarations: [AnexComponent, AnexDetailComponent, AnexUpdateComponent, AnexDeleteDialogComponent],
  entryComponents: [AnexDeleteDialogComponent],
})
export class OtvoreniAnexModule {}
