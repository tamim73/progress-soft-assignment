import { Component, OnInit } from '@angular/core';
import { ITableCol, ITableEvent } from 'src/app/core/components/table/table.models';

@Component({
    selector: 'app-accounts-list',
    templateUrl: './accounts-list.component.html',
    styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {

    constructor() { }

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


    tableEventHandler(e: ITableEvent) {
        console.log('clicked on row => ', e.row);
        // this.employeesService.openEmployeeDetails(e.row.id);
    }

}
