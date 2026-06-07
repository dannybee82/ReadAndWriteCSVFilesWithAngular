import { Component, OutputEmitterRef, output, ModelSignal, model, InputSignal, input } from '@angular/core';
import { CsvChangeData } from '../../../models/csv-change-data.interface'
import { ButtonWithImage } from '../../general/button-with-image/button-with-image';

@Component({
	imports: [
		ButtonWithImage,
	],
  selector: 'app-csv-change-popup',
  templateUrl: './csv-change-popup.html',
  styleUrls: ['./csv-change-popup.scss']
})
export class CsvChangePopup {
  readonly isPopupVisible: ModelSignal<boolean> = model(false);
  readonly csvValueId: InputSignal<number> = input(-1);
  readonly csvHeaderToApplyChangeOn: InputSignal<string> = input('');
  readonly csvValueToChange: InputSignal<string> = input('');
  readonly csvValueDefault: InputSignal<string> = input('');
  
  readonly callBackPopupIsClosed: OutputEmitterRef<boolean> = output<boolean>();
  readonly callBackValueChanged: OutputEmitterRef<CsvChangeData> = output<CsvChangeData>();

  showPopup(value: boolean): void {    
    this.isPopupVisible.set(value);
    this.callBackPopupIsClosed.emit(value);
  }

  valueChanged(value: string): void {
    let csvChangeData: CsvChangeData = {
      id: this.csvValueId(),
      changedValue: value
    };

    this.callBackValueChanged.emit(csvChangeData);

    this.isPopupVisible.set(false);
    this.callBackPopupIsClosed.emit(false);
  }

}