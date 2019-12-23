import { Component, OnInit, Input, EventEmitter, Output, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITableCol, ITableEvent } from './table.models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, Subscription } from 'rxjs';
import { startWith, delay } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {

    constructor(private http: HttpClient) { }

    private subscription: Subscription;
    pageSizeOptions = [5, 10, 25, 50];

    @Input() cols: ITableCol[];
    @Input() data: any[] = [];

    @Output() tableEvent = new EventEmitter<ITableEvent>();

    searchRequest: any;
    displayedColumns: string[] = [];
    dataSource: MatTableDataSource<any[]>;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    ngOnInit() {
        this.subscription = new Subscription();
        this.dataSource = new MatTableDataSource(this.data);
        this.displayedColumns = this.cols.map(col => col.name);
        this.displayedColumns.unshift('details'); // add arrows column
    }

    ngAfterViewInit() {
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onActionClicked(actionName: string, row: any) {
        const event: ITableEvent = {
            action: actionName,
            row
        };
        this.tableEvent.emit(event);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
