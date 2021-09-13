import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { HvalePonudeRoutingModule } from './route/hvale-ponude-routing.module';
import {HvalePonudeComponent} from "app/entities/otvoreni/hvale-ponude/list/hvale-ponude.component";
import {MatTableModule} from "@angular/material/table";
import {MatTableExporterModule} from "mat-table-exporter";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  imports: [SharedModule, HvalePonudeRoutingModule, MatTableModule, MatTableExporterModule, MatSortModule, MatPaginatorModule],
  declarations: [HvalePonudeComponent],
  entryComponents: [],
  exports: [
    HvalePonudeComponent
  ]
})
export class OtvoreniHvalePonudeModule {}
