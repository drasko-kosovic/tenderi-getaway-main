import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PonudeComponent } from './list/ponude.component';
import { PonudeDetailComponent } from './detail/ponude-detail.component';

import { PonudeDeleteDialogComponent } from './delete/ponude-delete-dialog.component';
import { PonudeRoutingModule } from './route/ponude-routing.module';
import {MatTableModule} from "@angular/material/table";
import {MatTableExporterModule} from "mat-table-exporter";
import {MatSortModule} from "@angular/material/sort";
import {PonudeUpdateComponent} from "app/entities/otvoreni/ponude/update/ponude-update.component";

@NgModule({
  imports: [SharedModule, PonudeRoutingModule, MatTableModule, MatTableExporterModule, MatSortModule],
  declarations: [PonudeComponent, PonudeDetailComponent, PonudeUpdateComponent, PonudeDeleteDialogComponent],
  entryComponents: [PonudeDeleteDialogComponent],
})
export class OtvoreniPonudeModule {}
