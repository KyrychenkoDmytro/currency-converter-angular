import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { CalculatorComponent } from './calculator.component';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyDetailsComponent } from './_components/currency-details.component';
import { CurrencyControlComponent } from './_components/currency-control.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [
  {
    path: '',
    component: CalculatorComponent,
  }
];

@NgModule({
  declarations: [
    CalculatorComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatInputModule,
    MatSelectModule,
    CurrencyDetailsComponent,
    CurrencyControlComponent,
    MatProgressSpinnerModule,
    TranslateModule,
  ],
  providers: [DecimalPipe]
})
export class CalculatorModule { }
