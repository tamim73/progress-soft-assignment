import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ITableCol, ITableEvent } from 'src/app/core/components/table/table.models';
import { AccountsService } from '../accounts.service';
import { TableComponent } from 'src/app/core/components/table/table.component';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-accounts-list',
    templateUrl: './accounts-list.component.html',
    styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit, AfterViewInit {
    constructor(
        private accountService: AccountsService,
    ) { }

    @ViewChild('table', { static: false }) accountsTable: TableComponent;
    isloading = true;
    accountColumns: ITableCol[] = [
        {
            name: 'id',
            label: 'Id',
        },
        {
            name: 'accountNumber',
            label: 'Account Number',
        },
        {
            name: 'accountHolderName',
            label: 'Account Holder Name',
        },
        {
            name: 'accountHolderPhoneNumber',
            label: 'Account Holder Phone Number',
        },
    ];

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.accountService.getAllAccounts()
            .pipe(
                finalize(() => this.isloading = false)
            )
            .subscribe(res => {
                console.log(res);

                this.accountsTable.updateData(res);
            });
    }

    searchEventHandler(text: string) {
        this.accountsTable.applyFilter(text);
    }

    tableEventHandler(e: ITableEvent) {
        const account = e.row;
        console.log('clicked on row => ', account);
        this.accountService.openAccountDetails(account);
    }

}
