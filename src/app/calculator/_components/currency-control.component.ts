import { Component, Input, } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICurrency } from '../../_types/currency';
import { KeyValuePipe, NgForOf } from '@angular/common';
import { ToCurrencyTitlePipe } from '../_pipes/currency-title.pipe';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-currency-control',
  template: `
    <form [formGroup]="form">
      <mat-form-field>
        <mat-label>{{'AMOUNT_LABEL' | translate}}</mat-label>
        <input type="number" matInput formControlName="value">
      </mat-form-field>
      <mat-form-field>
        <mat-label>{{'CURRENCY_LABEL' | translate}}</mat-label>
        <mat-select formControlName="currency">
          <mat-option
            *ngFor="let rate of currencyData.rates | keyvalue"
            [value]="rate.key"
          >
            {{rate.key | toCurrencyTitle}}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </form>
  `,

  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    KeyValuePipe,
    NgForOf,
    ToCurrencyTitlePipe,
    TranslateModule
  ]
})

export class CurrencyControlComponent {
  @Input() public form!: FormGroup;
  @Input() public currencyData!: ICurrency;
}
