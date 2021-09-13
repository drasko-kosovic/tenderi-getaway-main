import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'ponude',
        data: { pageTitle: 'tenderiApp.otvoreniPonude.home.title' },
        loadChildren: () => import('./otvoreni/ponude/ponude.module').then(m => m.OtvoreniPonudeModule),
      },
      {
        path: 'postupci',
        data: { pageTitle: 'tenderiApp.otvoreniPostupci.home.title' },
        loadChildren: () => import('./otvoreni/postupci/postupci.module').then(m => m.OtvoreniPostupciModule),
      },
      {
        path: 'ponudjaci',
        data: { pageTitle: 'tenderiApp.otvoreniPonudjaci.home.title' },
        loadChildren: () => import('./otvoreni/ponudjaci/ponudjaci.module').then(m => m.OtvoreniPonudjaciModule),
      },
      {
        path: 'narucilac',
        data: { pageTitle: 'tenderiApp.otvoreniNarucilac.home.title' },
        loadChildren: () => import('./otvoreni/narucilac/narucilac.module').then(m => m.OtvoreniNarucilacModule),
      },
      {
        path: 'ugovor',
        data: { pageTitle: 'tenderiApp.otvoreniUgovor.home.title' },
        loadChildren: () => import('./otvoreni/ugovor/ugovor.module').then(m => m.OtvoreniUgovorModule),
      },
      {
        path: 'specifikacije',
        data: { pageTitle: 'tenderiApp.otvoreniSpecifikacije.home.title' },
        loadChildren: () => import('./otvoreni/specifikacije/specifikacije.module').then(m => m.OtvoreniSpecifikacijeModule),
      },
      {
        path: 'anex',
        data: { pageTitle: 'tenderiApp.otvoreniAnex.home.title' },
        loadChildren: () => import('./otvoreni/anex/anex.module').then(m => m.OtvoreniAnexModule),
      },
       {
        path: 'tenderi-home',
        data: { pageTitle: 'tenderiApp.tenderiHome.home.title' },
        loadChildren: () => import('./otvoreni/tenderi-home/tenderi-home.module').then(m => m.TenderiHomeModule),
      },
      {
        path: 'view-ponude',
        data: { pageTitle: 'tenderiApp.otvoreniViewPonude.home.title' },
        loadChildren: () => import('./otvoreni/view-ponude/view-ponude.module').then(m => m.OtvoreniViewPonudeModule),
      },
      {
        path: 'vrednovanje',

        loadChildren: () => import('./otvoreni/view-vrednovanje/view-vrednovanje.module').then(m => m.OtvoreniViewVrednovanjeModule),
      },
      {
        path: 'prvorangirani',
        data: { pageTitle: 'tenderiApp.prvorangirani.home.title' },
        loadChildren: () => import('./otvoreni/view-prvorangirani/view-prvorangirani.module').then(m => m.OtvoreniViewPrvorangiraniModule),
      },
      {
        path: 'hvale-ponude',
        data: { pageTitle: 'tenderiApp.hvale-ponudei.home.title' },
        loadChildren: () => import('./otvoreni/hvale-ponude/hvale-ponude.module').then(m => m.OtvoreniHvalePonudeModule),
      },

      {
        path: 'ugovor',
        data: { pageTitle: 'tenderiApp.ugovor.home.title' },
        loadChildren: () => import('./otvoreni/ugovor/ugovor.module').then(m => m.OtvoreniUgovorModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
