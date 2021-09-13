import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ViewPrvorangiraniComponent } from '../list/view-prvorangirani.component';
import { ViewPrvorangiraniDetailComponent } from '../detail/view-prvorangirani-detail.component';
import { ViewPrvorangiraniRoutingResolveService } from './view-prvorangirani-routing-resolve.service';

const viewPrvorangiraniRoute: Routes = [
  {
    path: '',
    component: ViewPrvorangiraniComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ViewPrvorangiraniDetailComponent,
    resolve: {
      viewPrvorangirani: ViewPrvorangiraniRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(viewPrvorangiraniRoute)],
  exports: [RouterModule],
})
export class ViewPrvorangiraniRoutingModule {}
