import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments.component';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { PaymentsService } from './payments.service';

const routes: Routes = [
  {
    path: '',
    component: PaymentsComponent,
    children: [
      {
        path: '',
        component: PaymentsListComponent
      },
      {
        path: 'add',
        component: PaymentDetailComponent,
      },
      {
        path: ':id',
        component: PaymentDetailComponent,
        canActivate: [PaymentsService]
      },
      {
        path: '**',
        redirectTo: '',
      },
    ]
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [PaymentsComponent, PaymentsListComponent, PaymentDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule,
  ]
})
export class PaymentsModule { }
