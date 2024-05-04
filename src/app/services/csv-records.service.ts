import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CsvShowRecord } from '../models/csv-show-record';

@Injectable({
  providedIn: 'root'
})
export class CsvRecordsService {

  private _currentCsvRecords: BehaviorSubject<CsvShowRecord | null> = new BehaviorSubject<CsvShowRecord | null>(null);
  private _changeCsvRecord: BehaviorSubject<CsvShowRecord | null> = new BehaviorSubject<CsvShowRecord | null>(null);

  setCurrentCsvRecords(value: CsvShowRecord) : void {
    this._currentCsvRecords.next(value);
  }
  
  getCurrentCsvRecords() : BehaviorSubject<CsvShowRecord | null> {
    return this._currentCsvRecords;
  }
  
  setChangeCsvRecord(value: CsvShowRecord) : void {
    this._changeCsvRecord.next(value);
  }
  
  getChangeCsvRecord() : BehaviorSubject<CsvShowRecord | null> {
    return this._changeCsvRecord;
  }
  
}