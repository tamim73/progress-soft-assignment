import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'account',
        loadChildren: () => import('src/app/pages/accounts/accounts.module').then(m => m.AccountsModule),
      },
      {
        path: 'payment',
        loadChildren: () => import('src/app/pages/payments/payments.module').then(m => m.PaymentsModule),
      },
    ]
  },
];

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PagesModule { }
