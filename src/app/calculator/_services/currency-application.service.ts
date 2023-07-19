import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICurrency, TCurrencyShortName } from '../../_types/currency';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CurrencyApplicationService {

  public constructor(
    private _http: HttpClient,
  ) {}

  public getLatestRates$(selectedCurrency: TCurrencyShortName): Observable<ICurrency> {
    return this._http.get<any>(`https://api.exchangerate.host/latest?base=${selectedCurrency}`);
  }
}
