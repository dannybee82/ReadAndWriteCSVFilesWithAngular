import { Component, model, ModelSignal, signal, WritableSignal } from '@angular/core';
import { ButtonWithImage } from '../../general/button-with-image/button-with-image';

@Component({
  selector: 'app-csv-properties',
  imports: [ButtonWithImage],
  templateUrl: './csv-properties.html',
  styleUrl: './csv-properties.scss',
})
export class CsvProperties {
  protected isMenuVisible: WritableSignal<boolean> = signal(false);
  
  readonly csvSeparator: ModelSignal<string> = model('');
  readonly csvEnclosing: ModelSignal<string> = model('');
  readonly csvFirstRowIsHeader: ModelSignal<boolean> = model(true);
  readonly csvIsUtf8: ModelSignal<boolean> = model(true);
}
