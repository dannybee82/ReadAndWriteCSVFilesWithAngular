import { Component } from '@angular/core';
import { CsvMain } from './components/csv/csv-main/csv-main';

@Component({
	imports: [
		CsvMain,
	],
  selector: 'app-root',
  template: `<app-csv-main />`
})
export class App {
  title = 'angular-load-csv';
}