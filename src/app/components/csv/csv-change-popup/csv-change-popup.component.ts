import { Component, OutputEmitterRef, output, ModelSignal, model, InputSignal, input } from '@angular/core';
import { CsvChangeData } from '../../../models/csv-change-data.interface'
import { ButtonWithImageComponent } from 'src/app/components/general/button-with-image/button-with-image.component';

@Component({
	standalone: true,
	imports: [
		ButtonWithImageComponent,
	],
  selector: 'app-csv-change-popup',
  templateUrl: './csv-change-popup.component.html',
  styleUrls: ['./csv-change-popup.component.scss']
})
export class CsvChangePopupComponent {
  isPopupVisible: ModelSignal<boolean> = model(false);

  csvValueId: InputSignal<number> = input(-1);
  csvHeaderToApplyChangeOn: InputSignal<string> = input('');
  csvValueToChange: InputSignal<string> = input('');
  csvValueDefault: InputSignal<string> = input('');
  
  callBackPopupIsClosed: OutputEmitterRef<boolean> = output<boolean>();
  callBackValueChanged: OutputEmitterRef<CsvChangeData> = output<CsvChangeData>();

  showPopup(value: boolean) : void {    
    this.isPopupVisible.set(value);
    this.callBackPopupIsClosed.emit(value);
  }

  valueChanged(value: string) : void {
    let csvChangeData: CsvChangeData = {
      id: this.csvValueId(),
      changedValue: value
    };

    this.callBackValueChanged.emit(csvChangeData);

    this.isPopupVisible.set(false);
    this.callBackPopupIsClosed.emit(false);
  }

}