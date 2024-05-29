import { Component, ModelSignal, model, signal, WritableSignal } from '@angular/core';
import { ButtonWithImageComponent } from 'src/app/components/general/button-with-image/button-with-image.component';

@Component({
	standalone: true,
	imports: [
		ButtonWithImageComponent,
	],
  selector: 'app-csv-settings',
  templateUrl: './csv-settings.component.html',
  styleUrls: ['./csv-settings.component.scss']
})

export class CsvSettingsComponent {
  isMenuVisible: WritableSignal<boolean> = signal(false);
  
  csvSeparator: ModelSignal<string> = model('');
  csvEnclosing: ModelSignal<string> = model('');
  csvFirstRowIsHeader: ModelSignal<boolean> = model(true);
  csvIsUtf8: ModelSignal<boolean> = model(true);

  showMenu() : void {
    this.isMenuVisible.set(!this.isMenuVisible());
  }

  changeString(id: number, value: string) : void {
    if(id == 0) {
      this.csvSeparator.set(value);      
    } else {
      this.csvEnclosing.set(value);
    }
  }

  changeBoolean(id: number, value: boolean) : void {
    if(id == 0) {
      this.csvFirstRowIsHeader.set(value);      
    } else {
      this.csvIsUtf8.set(value);      
    }
  }

}