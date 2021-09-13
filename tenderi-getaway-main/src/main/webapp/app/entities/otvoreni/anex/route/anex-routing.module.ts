import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AnexComponent } from '../list/anex.component';
import { AnexDetailComponent } from '../detail/anex-detail.component';
import { AnexUpdateComponent } from '../update/anex-update.component';
import { AnexRoutingResolveService } from './anex-routing-resolve.service';

const anexRoute: Routes = [
  {
    path: '',
    component: AnexComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AnexDetailComponent,
    resolve: {
      anex: AnexRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AnexUpdateComponent,
    resolve: {
      anex: AnexRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AnexUpdateComponent,
    resolve: {
      anex: AnexRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(anexRoute)],
  exports: [RouterModule],
})
export class AnexRoutingModule {}
