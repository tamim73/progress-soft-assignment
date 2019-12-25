import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  currencyURL = environment.apiURL + 'currency';

  getCurrencies(): Observable<string[]> {
    return this.http.get<string[]>(this.currencyURL);
  }
}
