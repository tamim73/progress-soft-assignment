import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { PaymentsService } from '../payments.service';
import { IPayment } from '../payment.models';
import { CurrencyService } from '../currrency.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss']
})
export class PaymentDetailComponent implements OnInit {

  constructor(
    private paymentService: PaymentsService,
    private fb: FormBuilder,
    private currencyService: CurrencyService,
    private alert: AlertService,
    private router: Router,
  ) { }

  title: string;
  mode: 'add' | 'details';
  paymentFG: FormGroup;
  loading$ = new BehaviorSubject(false);

  paymentFormFields = [
    {
      name: 'amount',
      errors: {
        min: 'Minimum amount is 1',
        required: 'Amount is required',
      },
      label: 'Amount',
      type: 'number',
      placeholder: 'Enter amount',
    },
    {
      name: 'currencyCode',
      errors: {
        required: 'Currency code is required',
      },
      label: 'Currency Code',
      type: 'select',
      placeholder: 'Select currency code',
      options: []
    },
    {
      name: 'sourceAccountNumber',
      errors: {
        required: 'Source account number is required',
        minlength: 'Minimum length is 6 digits',
        maxlength: 'Maximum length is 6 digits',
      },
      label: 'Source Account Number',
      type: 'number',
      placeholder: 'Enter source account number',
    },
    {
      name: 'destinationAccountNumber',
      errors: {
        required: 'Destination account number is required',
        match: 'Must be different than the Source Account Number',
        minlength: 'Minimum length is 6 digits',
        maxlength: 'Maximum length is 6 digits',
      },
      label: 'Destination Account Number',
      type: 'number',
      placeholder: 'Enter destination account number',
    },
    {
      name: 'paymentDescription',
      errors: {
        maxLength: 'Maximum length is 1000 characters'
      },
      label: 'Payment Description',
      type: 'area',
      placeholder: 'Enter payment description',
    },
  ];

  ngOnInit() {
    this.currencyService.getCurrencies().subscribe(currencies => {
      this.paymentFormFields.find(field => field.name === 'currencyCode').options = currencies;
    });

    this.paymentFG = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      currencyCode: ['', [Validators.required]],
      sourceAccountNumber: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)
      ]],
      destinationAccountNumber: ['',
        [Validators.required,
        this.matchValidator('sourceAccountNumber'),
        Validators.minLength(6),
        Validators.maxLength(6)]],
      paymentDescription: ['', [Validators.maxLength(1000)]],
    });

    this.mode = this.paymentService.hasActivePayment() ? 'details' : 'add';

    if (this.mode === 'add') {
      this.title = 'Add Payment';
    } else {
      this.title = 'Payment Details';
      this.paymentFG.patchValue(this.paymentService.activePayment());
      this.paymentFG.disable();
    }
  }

  getErrorMessage(ctrlName: string): string {
    if (this.paymentFG.controls[ctrlName].invalid) {
      const errors = this.paymentFG.controls[ctrlName].errors;
      const key = Object.keys(errors)[0];
      return this.paymentFormFields.find(field => field.name === ctrlName).errors[key];
    }
  }

  submit() {
    if (this.paymentFG.valid) {
      const request: IPayment = {
        amount: +this.paymentFG.value.amount,
        currencyCode: this.paymentFG.value.currencyCode,
        sourceAccountNumber: +this.paymentFG.value.sourceAccountNumber,
        destinationAccountNumber: +this.paymentFG.value.destinationAccountNumber,
      };

      this.paymentService.addPayment(request).subscribe(res => {
        this.alert.showSuccess('Payment added successfully');
        this.router.navigate(['app/payment']);
      });
    }
  }

  matchValidator(targetCtrlName: string) {
    const isEmptyInputValue = (value) => value == null || value.length === 0;
    return (control: AbstractControl) => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(targetCtrlName)) {
        return null;
      }
      const target = control.parent.controls[targetCtrlName];
      if (target && control.value == target.value) {
        return { match: true };
      }
      return null;
    };
  }
}
