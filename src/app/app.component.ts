import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../enviroments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private _translateService: TranslateService,
    ) {
    _translateService.use(environment.locale);
  }
}
