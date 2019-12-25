import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IPayment } from './payment.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(
    private http: HttpClient,
    private router: Router,

  ) { }

  paymentURL = environment.apiURL + 'payment';

  private activePaymentSubject = new BehaviorSubject<IPayment>(null);

  activePayment(): IPayment {
    return this.activePaymentSubject.value;
  }

  getAllPayments(): Observable<IPayment[]> {
    return this.http.get<IPayment[]>(this.paymentURL);
  }

  getPaymentById(id: string): Observable<IPayment> {
    return this.http.get<IPayment>(this.paymentURL + '/' + id);
  }

  addPayment(request: IPayment): Observable<IPayment> {
    return this.http.post<IPayment>(this.paymentURL + '/add', request);
  }

  hasActivePayment(): boolean {
    return !!this.activePaymentSubject.value;
  }

  clearActivePayment() {
    this.activePaymentSubject.next(null);
  }

  goHome() {
    this.router.navigate([`app/payment`]);
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {

    if (this.activePaymentSubject.value) {
      return of(true);
    }

    const id = route.paramMap.get('id');

    if (id) {
      return this.getPaymentById(id).pipe(
        map(payment => {
          this.activePaymentSubject.next(payment);
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

  openPaymentDetails(payment: IPayment) {
    const id = payment.id;
    if (id) {
      this.getPaymentById(id).subscribe(paymentDetails => {
        this.activePaymentSubject.next(paymentDetails);
        this.router.navigate([`app/payment/${id}`]);
      });
    } else {
      this.router.navigate([`app/payment/add`]);
    }
  }
}
