import { Component, ModelSignal, model, signal, WritableSignal } from '@angular/core';
import { ButtonWithImageComponent } from '../../general/button-with-image/button-with-image.component';

@Component({
	imports: [
		ButtonWithImageComponent,
	],
  selector: 'app-csv-settings',
  templateUrl: './csv-settings.component.html',
  styleUrls: ['./csv-settings.component.scss']
})
export class CsvSettingsComponent {
  protected isMenuVisible: WritableSignal<boolean> = signal(false);
  
  readonly csvSeparator: ModelSignal<string> = model('');
  readonly csvEnclosing: ModelSignal<string> = model('');
  readonly csvFirstRowIsHeader: ModelSignal<boolean> = model(true);
  readonly csvIsUtf8: ModelSignal<boolean> = model(true);
}