import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CsvChangeData } from '../../../models/csv-change-data'
import { ButtonComponent } from 'src/app/components/general/button/button.component';
import { ButtonWithImageComponent } from 'src/app/components/general/button-with-image/button-with-image.component';

@Component({
	standalone: true,
	imports: [
		ButtonComponent,
		ButtonWithImageComponent,
	],
  selector: 'app-csv-change-popup',
  templateUrl: './csv-change-popup.component.html',
  styleUrls: ['./csv-change-popup.component.css']
})

export class CsvChangePopupComponent {
  @Input() isPopupVisible: boolean = false;

  @Input() csvValueId: number = -1;
  @Input() csvHeaderToApplyChangeOn: string = '';
  @Input() csvValueToChange: string = '';
  @Input() csvValueDefault: string = '';
  
  @Output() callBackPopupIsClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() callBackValueChanged: EventEmitter<CsvChangeData> = new EventEmitter<CsvChangeData>();

  constructor() {}

  showPopup(value: boolean) : void {    
    this.isPopupVisible = value;
    this.callBackPopupIsClosed.emit(value);
  }

  valueChanged(value: string) : void {
    let csvChangeData: CsvChangeData = new CsvChangeData(this.csvValueId, value);

    this.callBackValueChanged.emit(csvChangeData);

    this.isPopupVisible = false;
    this.callBackPopupIsClosed.emit(false);
  }

}