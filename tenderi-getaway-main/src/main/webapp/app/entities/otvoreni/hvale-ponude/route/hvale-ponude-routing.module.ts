import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { HvalePonudeComponent } from '../list/hvale-ponude.component';

const hvalePonudeRoute: Routes = [
  {
    path: '',
    component: HvalePonudeComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },

];

@NgModule({
  imports: [RouterModule.forChild(hvalePonudeRoute)],
  exports: [RouterModule],
})
export class HvalePonudeRoutingModule {}
