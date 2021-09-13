import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ViewPrvorangiraniComponent } from './list/view-prvorangirani.component';
import { ViewPrvorangiraniRoutingModule } from './route/view-prvorangirani-routing.module';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatTableExporterModule} from "mat-table-exporter";

@NgModule({
    imports: [SharedModule, ViewPrvorangiraniRoutingModule, MatPaginatorModule, MatTableModule, MatSortModule, MatTableExporterModule],
    declarations: [ViewPrvorangiraniComponent],
    exports: [
        ViewPrvorangiraniComponent
    ]
})
export class OtvoreniViewPrvorangiraniModule {}
