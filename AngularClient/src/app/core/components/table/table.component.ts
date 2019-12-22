import { Component, OnInit, Input, EventEmitter, Output, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITableCol, ITableEvent } from './table.models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, Subscription } from 'rxjs';
import { startWith, delay } from 'rxjs/operators';

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
  @Input() dataRoute: string;

  @Output() tableEvent = new EventEmitter<ITableEvent>();

  searchRequest: any;
  displayedColumns: string[] = [];
  // dataSource: AssignmentDataSource;

  // private batchSubject = new BehaviorSubject<IBatchRequest>(this.batch);
  // public batch$ = this.batchSubject.asObservable();


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  ngOnInit() {
    this.subscription = new Subscription();
    this.displayedColumns = this.cols.map(col => col.name);
    this.displayedColumns.unshift('details'); // add arrows column
    // this.dataSource = new AssignmentDataSource(this.http);
  }

  ngAfterViewInit() {
    this.subscription.add(
      // this.sort.sortChange.subscribe(sort => {
      //   const PageNo = this.batchSubject.value.pageNo;
      //   const PageSize = this.batchSubject.value.pageSize;
      //   this.batchSubject.next({
      //     pageNo: PageNo,
      //     pageSize: PageSize,
      //     sortOrder: sort.direction,
      //     sortProperty: sort.active,
      //   });
      // })
    );

    this.subscription.add(
      // this.paginator.page.subscribe(paginator => {
      //   const SortOrder = this.batchSubject.value.sortOrder;
      //   const SortProperty = this.batchSubject.value.sortProperty;
      //   this.batchSubject.next({
      //     pageNo: paginator.pageIndex + 1, // mat-paginator start at 0
      //     pageSize: paginator.pageSize,
      //     sortOrder: SortOrder,
      //     sortProperty: SortProperty,
      //   });
      // })
    );

    // this.subscription.add(
    //   this.batchSubject
    //     .pipe(
    //       delay(0)
    //     )
    //     .subscribe(() => this.loadTable())
    // );
  }

  loadTable(searchRequest?: any) {
    if (searchRequest) {
      this.searchRequest = searchRequest; // store search req to prevent losing when paginating
    }
    // this.dataSource.load(this.dataRoute, this.batchSubject.value, this.searchRequest);
  }

  resetTable() {
    // this.batchSubject.next(this.batch);
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
