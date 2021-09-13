import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { TenderiHomeComponent } from './list/tenderi-home.component';
import { TenderiHomeRoutingModule } from './route/tenderi-home-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import {JhMaterialModule} from "app/shared/jh-material.module";
import {OtvoreniSpecifikacijeModule} from "app/entities/otvoreni/specifikacije/specifikacije.module";

import {OtvoreniViewVrednovanjeModule} from "app/entities/otvoreni/view-vrednovanje/view-vrednovanje.module";
import {OtvoreniViewPrvorangiraniModule} from "app/entities/otvoreni/view-prvorangirani/view-prvorangirani.module";
import {OtvoreniViewPonudeModule} from "app/entities/otvoreni/view-ponude/view-ponude.module";
import {OtvoreniHvalePonudeModule} from "app/entities/otvoreni/hvale-ponude/hvale-ponude.module";
import {OtvoreniUgovorModule} from "app/entities/otvoreni/ugovor/ugovor.module";

@NgModule({
    imports: [
        SharedModule,
        TenderiHomeRoutingModule,
        MatTabsModule,
        JhMaterialModule,
        OtvoreniSpecifikacijeModule,
        OtvoreniViewPonudeModule,
        OtvoreniViewVrednovanjeModule,
        OtvoreniViewPrvorangiraniModule,
        OtvoreniHvalePonudeModule,
        OtvoreniUgovorModule,

    ],
  declarations: [TenderiHomeComponent],
})
export class TenderiHomeModule {}
