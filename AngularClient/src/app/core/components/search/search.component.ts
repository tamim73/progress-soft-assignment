import { Component, OnInit, Output, EventEmitter, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

    constructor() { }

    @Output() searchEvent = new EventEmitter();
    @Output() clearSearchEvent = new EventEmitter();

    subscription: Subscription;
    mainSearch: FormControl;

    ngOnInit() {
        this.subscription = new Subscription();
        this.mainSearch = new FormControl();

        this.subscription.add(
            this.mainSearch.valueChanges
                .pipe(
                    debounceTime(737),
                    distinctUntilChanged(),
                )
                .subscribe(value => {
                    this.submitSearchReq(value);
                })
        );
    }

    submitSearchReq(searchRequest: string = this.mainSearch.value) {
        this.searchEvent.emit(searchRequest);
    }

    clearSearch() {
        this.mainSearch.reset('', { emitEvent: false });
        this.clearSearchEvent.emit();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
