import { Component, Input, } from '@angular/core';
import { TCurrencyShortName } from '../../_types/currency';
import { ToCurrencyTitlePipe } from '../_pipes/currency-title.pipe';

@Component({
  selector: 'app-currency-details',
  template: `
    <h3>1 {{primaryCurrency | toCurrencyTitle}}</h3>
    <h2>{{currentRate}} {{secondaryCurrency | toCurrencyTitle}}</h2>
  `,
  standalone: true,
  imports: [ToCurrencyTitlePipe]
})

export class CurrencyDetailsComponent {
  public get currentRate(): number {
    if(!this.rate) {
      return 0
    }

    return Number((this.rate).toFixed(2));
  }

  @Input() public primaryCurrency!: TCurrencyShortName
  @Input() public secondaryCurrency!: TCurrencyShortName
  @Input() public rate!: number;
}
