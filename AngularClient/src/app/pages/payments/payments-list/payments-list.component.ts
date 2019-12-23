import { Component, OnInit } from '@angular/core';
import { ITableCol } from 'src/app/core/components/table/table.models';

@Component({
    selector: 'app-payments-list',
    templateUrl: './payments-list.component.html',
    styleUrls: ['./payments-list.component.scss']
})
export class PaymentsListComponent implements OnInit {

    constructor() { }

    paymentColumns: ITableCol[] = [
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

}
