import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { IAccount } from '../accounts.model';

@Component({
    selector: 'app-account-detail',
    templateUrl: './account-detail.component.html',
    styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit, OnDestroy {

    constructor(
        private accountService: AccountsService,
        private fb: FormBuilder,

    ) { }

    title: string;
    mode: 'add' | 'details';
    accountFG: FormGroup;
    loading$ = new BehaviorSubject(false);

    accountFormFields = [
        {
            name: 'accountNumber',
            errors: {
                required: 'Account number is required',
                minlength: 'Minimum length is 6 digits',
                maxlength: 'Maximum length is 6 digits',
            },
            label: 'Account Number',
            type: 'number',
            placeholder: 'Enter account number',
        },
        {
            name: 'accountHolderName',
            errors: {
                required: 'Account holder name is required',
            },
            label: 'Account Holder Name',
            type: 'text',
            placeholder: 'Enter account holder name',
        },
        {
            name: 'accountHolderPhoneNumber',
            errors: {
            },
            label: 'Account Holder Phone Number',
            type: 'tel',
            placeholder: 'Enter account holder phone number',
        },
        {
            name: 'accountDescription',
            errors: {
                maxLength: 'Maximum length is 1000 characters'
            },
            label: 'Account Description',
            type: 'area',
            placeholder: 'Enter account description',
        },
    ];

    ngOnInit() {

        this.accountFG = this.fb.group({
            accountNumber: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
            accountHolderName: ['', [Validators.required]],
            accountHolderPhoneNumber: ['', []],
            accountDescription: ['', [Validators.maxLength(1000)]],
        });

        this.mode = this.accountService.hasActiveEmployee() ? 'details' : 'add';

        if (this.mode === 'add') {
            this.title = 'Add Account';
        } else {
            this.title = 'Account Details';
            this.accountFG.disable();
        }
    }

    getErrorMessage(ctrlName: string): string {
        if (this.accountFG.controls[ctrlName].invalid) {
            const errors = this.accountFG.controls[ctrlName].errors;
            const key = Object.keys(errors)[0];
            return this.accountFormFields.find(field => field.name === ctrlName).errors[key];
        }
    }

    submit() {
        if (this.accountFG.valid) {
            const request: IAccount = {
                accountHolderName: this.accountFG.value.accountHolderName,
                accountNumber: +this.accountFG.value.accountNumber,
                accountDescription: this.accountFG.value.accountDescription,
                accountHolderPhoneNumber: this.accountFG.value.accountHolderPhoneNumber,
            };

            this.accountService.addAccount(request).subscribe(res => {
                console.log(res);
            });
        }
    }


    ngOnDestroy() {
        this.accountService.clearActiveAccount();
    }
}
