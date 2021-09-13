import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { UgovorComponent } from './list/ugovor.component';
import { UgovorDetailComponent } from './detail/ugovor-detail.component';
import { UgovorUpdateComponent } from './update/ugovor-update.component';
import { UgovorDeleteDialogComponent } from './delete/ugovor-delete-dialog.component';
import { UgovorRoutingModule } from './route/ugovor-routing.module';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatTableExporterModule} from "mat-table-exporter";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  imports: [SharedModule, UgovorRoutingModule, MatPaginatorModule, MatTableModule, MatTableExporterModule, MatSortModule],
  declarations: [UgovorComponent, UgovorDetailComponent, UgovorUpdateComponent, UgovorDeleteDialogComponent],
  entryComponents: [UgovorDeleteDialogComponent],
  exports: [
    UgovorComponent
  ]
})
export class OtvoreniUgovorModule {}
