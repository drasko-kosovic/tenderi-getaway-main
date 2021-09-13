import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { NarucilacComponent } from '../list/narucilac.component';
import { NarucilacDetailComponent } from '../detail/narucilac-detail.component';
import { NarucilacUpdateComponent } from '../update/narucilac-update.component';
import { NarucilacRoutingResolveService } from './narucilac-routing-resolve.service';

const narucilacRoute: Routes = [
  {
    path: '',
    component: NarucilacComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NarucilacDetailComponent,
    resolve: {
      narucilac: NarucilacRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NarucilacUpdateComponent,
    resolve: {
      narucilac: NarucilacRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NarucilacUpdateComponent,
    resolve: {
      narucilac: NarucilacRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(narucilacRoute)],
  exports: [RouterModule],
})
export class NarucilacRoutingModule {}
