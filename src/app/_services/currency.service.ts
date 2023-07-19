import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ICurrency, TCurrencyShortName } from '../_types/currency';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/environment';

@Injectable({ providedIn: 'root' })
export class CurrencyService {

  public get actualRateBaseOnUAH$(): Observable<ICurrency> {
    return this._rateBaseOnUAH$.asObservable();
  }

  public get actualRateBaseOnSelectedCurrency$(): Observable<ICurrency> {
    return this._rateBaseOnSelectedCurrency$.asObservable();
  }

  private _rateBaseOnUAH$: ReplaySubject<ICurrency> = new ReplaySubject<ICurrency>(1);
  private _rateBaseOnSelectedCurrency$: ReplaySubject<ICurrency> = new ReplaySubject<ICurrency>(1);

  public constructor(
    private _http: HttpClient,
  ) {
  }

  public loadRates(selectedCurrency: TCurrencyShortName): void {
    this._http.get<ICurrency>(`https://api.exchangerate.host/latest?base=${selectedCurrency}`)
      .subscribe((res:ICurrency) => {
        if(res.base === environment.initialPrimaryCurrency) {
          this._rateBaseOnUAH$.next(res);
        }
        this._rateBaseOnSelectedCurrency$.next(res)
      });
  }
}
