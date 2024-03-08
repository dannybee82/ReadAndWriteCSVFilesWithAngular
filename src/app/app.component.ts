import { Component } from '@angular/core';
import { CsvMainComponent } from 'src/app/components/csv/csv-main/csv-main.component';

@Component({
	standalone: true,
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