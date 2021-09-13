import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SpecifikacijeComponent } from './list/specifikacije.component';
import { SpecifikacijeUpdateComponent } from './update/specifikacije-update.component';

import {MatTableModule} from "@angular/material/table";
import {MatTableExporterModule} from "mat-table-exporter";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {SpecifikacijeRoutingModule} from "app/entities/otvoreni/specifikacije/route/specifikacije-routing.module";
import {SpecifikacijeDetailComponent} from "app/entities/otvoreni/specifikacije/detail/specifikacije-detail.component";
import {SpecifikacijeDeleteDialogComponent} from "app/entities/otvoreni/specifikacije/delete/specifikacije-delete-dialog.component";

@NgModule({
  imports: [SharedModule, SpecifikacijeRoutingModule, MatTableModule, MatTableExporterModule, MatSortModule, MatPaginatorModule],
    declarations: [SpecifikacijeComponent, SpecifikacijeDetailComponent, SpecifikacijeUpdateComponent, SpecifikacijeDeleteDialogComponent],
    entryComponents: [SpecifikacijeDeleteDialogComponent],
    exports: [
        SpecifikacijeComponent
    ]
})
export class OtvoreniSpecifikacijeModule {}
