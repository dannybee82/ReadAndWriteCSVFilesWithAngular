import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CsvData } from '../models/csv-data.interface';

@Injectable({
  providedIn: 'root'
})
export class CsvApplicationService {

  private _updateGridOrListMode: Subject<boolean> = new Subject<boolean>();
  private _requestDataToSave: Subject<boolean> = new Subject<boolean>();
  private _errors: Subject<string[]> = new Subject<string[]>();
  private _allData: Subject<CsvData | null> = new Subject<CsvData | null>();
  private _saveData: Subject<CsvData> = new Subject<CsvData>();
  private _createNew: Subject<CsvData> = new Subject<CsvData>();

  setCurrentMode(value: boolean): void {
    this._updateGridOrListMode.next(value);
  }

  getCurrentMode(): Subject<boolean> {
    return this._updateGridOrListMode;
  }

  setAllData(data: CsvData | null): void {
    this._allData.next(data);
  }
  
  getAllData(): Subject<CsvData | null> {
    return this._allData;
  }

  setSaveData(data: CsvData): void {
    this._saveData.next(data);
  }
  
  getSaveData(): Subject<CsvData> {
    return this._saveData;
  }
  
  setRequestDataToSave(value: boolean): void {
    this._requestDataToSave.next(value);
  }

  getRequestDataToSave(): Subject<boolean> {
    return this._requestDataToSave;
  }

  setErrors(errors: string[]): void {
    this._errors.next(errors);
  }

  getErrors(): Subject<string[]> {
    return this._errors;
  }

  setCreatenew(data: CsvData): void {
    this._createNew.next(data);
  }

  getCreateNew(): Subject<CsvData> {
    return this._createNew;
  }

}