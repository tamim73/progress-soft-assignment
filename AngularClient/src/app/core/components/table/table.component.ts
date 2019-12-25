import { Component, OnInit, Input, EventEmitter, Output, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITableCol, ITableEvent } from './table.models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {

    constructor(private http: HttpClient) { }

    pageSizeOptions = [5, 10, 25, 50];

    @Input() cols: ITableCol[];

    @Output() tableEvent = new EventEmitter<ITableEvent>();

    displayedColumns: string[] = [];

    private dataSource: MatTableDataSource<any[]>;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    ngOnInit() {
        this.dataSource = new MatTableDataSource([]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.displayedColumns = this.cols.map(col => col.name);
        this.displayedColumns.unshift('details'); // add arrows column
    }

    ngAfterViewInit() {
    }

    updateData(data: any[]) {
        this.dataSource.data = data;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onActionClicked(actionName: string, row: any) {
        const event: ITableEvent = {
            action: actionName,
            row
        };
        this.tableEvent.emit(event);
    }

    ngOnDestroy() {
    }
}
