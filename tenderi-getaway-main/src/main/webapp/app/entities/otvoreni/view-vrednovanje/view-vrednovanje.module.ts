import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { ViewVrednovanjeComponent } from './list/view-vrednovanje.component';
import { ViewVrednovanjeDetailComponent } from './detail/view-vrednovanje-detail.component';
import { ViewVrednovanjeRoutingModule } from './route/view-vrednovanje-routing.module';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableExporterModule} from "mat-table-exporter";

@NgModule({
  imports: [SharedModule, ViewVrednovanjeRoutingModule, MatTableModule, MatSortModule, MatPaginatorModule, MatTableExporterModule],
  declarations: [ViewVrednovanjeComponent, ViewVrednovanjeDetailComponent],
  exports: [
    ViewVrednovanjeComponent
  ]
})
export class OtvoreniViewVrednovanjeModule {}
