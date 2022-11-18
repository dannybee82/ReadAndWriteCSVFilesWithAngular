import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CsvChangeData } from '../../../models/csv-change-data'

@Component({
  selector: 'app-csv-change-popup',
  templateUrl: './csv-change-popup.component.html',
  styleUrls: ['./csv-change-popup.component.css']
})

export class CsvChangePopupComponent implements OnInit {
  @Input() isPopupVisible: boolean = false;

  @Input() csvValueId: number = -1;
  @Input() csvHeaderToApplyChangeOn: string = '';
  @Input() csvValueToChange: string = '';
  @Input() csvValueDefault: string = '';
  
  @Output() callBackPopupIsClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() callBackValueChanged: EventEmitter<CsvChangeData> = new EventEmitter<CsvChangeData>();

  constructor() { }

  ngOnInit(): void {
  }

  public ShowPopup(value: boolean) {
    this.isPopupVisible = value;

    this.callBackPopupIsClosed.emit(value);
  }

  VallueChanged(value: string) {
    let csvChangeData: CsvChangeData = new CsvChangeData(this.csvValueId, value);

    this.callBackValueChanged.emit(csvChangeData);

    this.isPopupVisible = false;
    this.callBackPopupIsClosed.emit(false);
  }

  RestoreDefaultValue() {
    this.csvValueToChange = this.csvValueDefault;
  }

}
