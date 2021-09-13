import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ViewPrvorangiraniComponent } from '../list/view-prvorangirani.component';

const viewPrvorangiraniRoute: Routes = [
  {
    path: '',
    component: ViewPrvorangiraniComponent,
    canActivate: [UserRouteAccessService],
  },

];

@NgModule({
  imports: [RouterModule.forChild(viewPrvorangiraniRoute)],
  exports: [RouterModule],
})
export class ViewPrvorangiraniRoutingModule {}
