import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyApplicationService } from './_services/currency-application.service';
import { delay, Subject, switchMap, takeUntil } from 'rxjs';
import { ICurrency, TCurrencyShortName } from '../_types/currency';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, OnDestroy {
  public currencyData: ICurrency | null = null;

  public primaryForm: FormGroup = this._fb.group({
    value: null,
    currency: 'UAH'
  });

  public secondaryForm: FormGroup = this._fb.group({
    value: null,
    currency: 'USD'
  });

  private _destroy$: Subject<void> = new Subject<void>();

  public constructor(
    private _currencyApplicationService: CurrencyApplicationService,
    private _fb: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this._currencyApplicationService.getLatestRates$(
      this.primaryForm.get('currency')?.value
    )
      .pipe(
        delay(500),
        takeUntil(this._destroy$)
      )
      .subscribe((currencyData: ICurrency) => {
        console.log(currencyData)
        this.currencyData = currencyData;
      });


    this.primaryForm.get('value')!.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((primaryValue) => {
        const secondaryCurrency: TCurrencyShortName = this.secondaryForm.get('currency')?.value;
        const rate: number = this.currencyData?.rates[secondaryCurrency]!;
        const value: number = Number((primaryValue * rate).toFixed(2));

        this.secondaryForm.patchValue({ value }, { emitEvent: false });
      });

    this.primaryForm.get('currency')!.valueChanges
      .pipe(switchMap(
          (currentCurrency: TCurrencyShortName) => this._currencyApplicationService.getLatestRates$(currentCurrency)),
        takeUntil(this._destroy$)
      )
      .subscribe((currencyData: ICurrency) => {
        this.currencyData = currencyData;

        const rate: number = this.currencyData?.rates[this.secondaryForm.get('currency')?.value]!;
        const value: number = this.primaryForm.get('value')?.value;
        const secondControlValue: number = Number((value * rate).toFixed(2));

        this.secondaryForm.patchValue({ value: secondControlValue }, { emitEvent: false });
      });


    this.secondaryForm.get('value')!.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((secondaryValue: number) => {
        const primaryCurrency: TCurrencyShortName = this.secondaryForm.get('currency')?.value;
        const rate: number = this.currencyData?.rates[primaryCurrency]!;
        const value: number = Number((secondaryValue / rate).toFixed(2));

        this.primaryForm.patchValue({ value }, { emitEvent: false });
      });

    this.secondaryForm.get('currency')!.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        const secondaryValue: number = this.secondaryForm.get('value')?.value;
        const rate: number = this.currencyData?.rates[this.secondaryForm.get('currency')?.value]!;
        const value: number = Number((secondaryValue / rate).toFixed(2));

        this.primaryForm.patchValue({ value }, { emitEvent: false });
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
