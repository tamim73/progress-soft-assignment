import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts.component';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { AccountsService } from './accounts.service';

const routes: Routes = [
    {
        path: '',
        component: AccountsComponent,
        children: [
            {
                path: '',
                component: AccountsListComponent
            },
            {
                path: 'add',
                component: AccountDetailComponent,
            },
            {
                path: ':id',
                component: AccountDetailComponent,
                canActivate: [AccountsService]
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
    declarations: [AccountsComponent, AccountsListComponent, AccountDetailComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CoreModule,
    ]
})
export class AccountsModule { }
