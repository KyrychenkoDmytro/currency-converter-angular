import { Pipe, PipeTransform } from '@angular/core';
import { TCurrencyShortName, TRates } from '../../_types/currency';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'toCurrencyTitle',
  standalone: true
})

export class ToCurrencyTitlePipe implements PipeTransform {
  public constructor(
    private _translationService: TranslateService
  ) {
  }
  public transform(value: TCurrencyShortName): string {
    return this._translationService.instant(value);
  }
}
