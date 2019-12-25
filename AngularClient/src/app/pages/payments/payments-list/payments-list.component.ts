import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ITableCol, ITableEvent } from 'src/app/core/components/table/table.models';
import { PaymentsService } from '../payments.service';
import { finalize } from 'rxjs/operators';
import { TableComponent } from 'src/app/core/components/table/table.component';

@Component({
    selector: 'app-payments-list',
    templateUrl: './payments-list.component.html',
    styleUrls: ['./payments-list.component.scss']
})
export class PaymentsListComponent implements OnInit, AfterViewInit {

    constructor(
        private paymentService: PaymentsService
    ) { }

    @ViewChild('table', { static: false }) paymentsTable: TableComponent;

    isloading = true;

    paymentColumns: ITableCol[] = [
        {
            name: 'id',
            label: 'Id',
        },
        {
            name: 'amount',
            label: 'Amount',
        },
        {
            name: 'currencyCode',
            label: 'Currency Code',
        },
        {
            name: 'sourceAccountNumber',
            label: 'Source Account Number',
        },
        {
            name: 'destinationAccountNumber',
            label: 'Destination Account Number',
        },
    ];

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.paymentService.getAllPayments()
            .pipe(
                finalize(() => this.isloading = false)
            )
            .subscribe(res => {
                console.log(res);

                this.paymentsTable.updateData(res);
            });
    }

    searchEventHandler(text: string) {
        this.paymentsTable.applyFilter(text);
    }

    tableEventHandler(e: ITableEvent) {
        const payment = e.row;
        console.log('clicked on row => ', payment);
        this.paymentService.openPaymentDetails(payment);
    }
}
