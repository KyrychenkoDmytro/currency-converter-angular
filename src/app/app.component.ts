import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../enviroments/environment';
import { CurrencyService } from './_services/currency.service';
import { delay, map, Observable } from 'rxjs';
import { ICurrency, TCurrencyShortName } from './_types/currency';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public actualFavoriteRates$: Observable<{ [key: TCurrencyShortName]: number }> = this._currencyService
    .actualRateBaseOnUAH$
    .pipe(
      delay(1000),
      map((res: ICurrency) => ({
        EUR: Number((1 / res.rates['EUR']).toFixed(2)),
        USD: Number((1 / res.rates['USD']).toFixed(2)),
      }))
    );

  public constructor(
    private _translateService: TranslateService,
    private _currencyService: CurrencyService,
  ) {
    _translateService.use(environment.locale);
    _currencyService.loadRates(environment.initialPrimaryCurrency);
  }
}
