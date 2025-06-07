import { Component } from '@angular/core';
import { CsvMainComponent } from './components/csv/csv-main/csv-main.component';

@Component({
	imports: [
		CsvMainComponent,
	],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-load-csv';
}