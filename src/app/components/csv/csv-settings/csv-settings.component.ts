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
  
  public csvSeparator: ModelSignal<string> = model('');
  public csvEnclosing: ModelSignal<string> = model('');
  public csvFirstRowIsHeader: ModelSignal<boolean> = model(true);
  public csvIsUtf8: ModelSignal<boolean> = model(true);
}