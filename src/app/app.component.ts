import { Component } from '@angular/core';
import { CsvMainComponent } from './components/csv/csv-main/csv-main.component';

@Component({
	imports: [
		CsvMainComponent,
	],
  selector: 'app-root',
  template: `<app-csv-main />`
})
export class AppComponent {
  title = 'angular-load-csv';
}