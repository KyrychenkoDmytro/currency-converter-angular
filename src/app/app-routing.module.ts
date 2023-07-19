import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'calculator',
  },
  {
    path: 'calculator',
    loadChildren: () => import('./calculator/calculator.module').then(m => m.CalculatorModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'calculator',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
