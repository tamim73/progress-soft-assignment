import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ITableCol, ITableEvent } from 'src/app/core/components/table/table.models';
import { AccountsService } from '../accounts.service';
import { TableComponent } from 'src/app/core/components/table/table.component';

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
        {
            name: 'accountDescription',
            label: 'Account Description',
        },
    ];

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.accountService.getAllAccounts().subscribe(res => {
            console.log(res);

            this.accountsTable.updateData(res);
        });
    }

    tableEventHandler(e: ITableEvent) {
        console.log('clicked on row => ', e.row);
        // this.employeesService.openEmployeeDetails(e.row.id);
    }

}
