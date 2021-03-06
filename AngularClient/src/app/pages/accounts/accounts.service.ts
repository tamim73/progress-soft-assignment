import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { IAccount } from './accounts.model';
import { environment } from 'src/environments/environment';
import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AccountsService implements CanActivate {

    constructor(
        private http: HttpClient,
        private router: Router,
    ) { }

    accountURL = environment.apiURL + 'account';

    private activeAccountSubject = new BehaviorSubject<IAccount>(null);

    activeAccount(): IAccount {
        return this.activeAccountSubject.value;
    }

    getAllAccounts(): Observable<IAccount[]> {
        return this.http.get<IAccount[]>(this.accountURL);
    }

    getAccountById(id: string): Observable<IAccount> {
        return this.http.get<IAccount>(this.accountURL + '/' + id);
    }

    addAccount(request: IAccount): Observable<IAccount> {
        return this.http.post<IAccount>(this.accountURL + '/add', request);
    }

    hasActiveAccount(): boolean {
        return !!this.activeAccountSubject.value;
    }

    clearActiveAccount() {
        this.activeAccountSubject.next(null);
    }

    goHome() {
        this.router.navigate([`app/account`]);
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {

        if (this.activeAccountSubject.value) {
            return of(true);
        }

        const id = route.paramMap.get('id');

        if (id) {
            return this.getAccountById(id).pipe(
                map(account => {
                    this.activeAccountSubject.next(account);
                    return true;
                }, err => {
                    this.goHome();
                    return false;
                })
            );
        }
        this.goHome();
        return of(false);
    }

    openAccountDetails(account: IAccount) {
        const id = account.id;
        if (id) {
            this.getAccountById(id).subscribe(accountDetails => {
                this.activeAccountSubject.next(accountDetails);
                this.router.navigate([`app/account/${id}`]);
            });
        } else {
            this.router.navigate([`app/employees/add`]);
        }
    }
}
