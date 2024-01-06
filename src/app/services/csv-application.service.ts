import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CsvDataInterface } from '../models/csv-data';

@Injectable({
  providedIn: 'root'
})
export class CsvApplicationService {

  private _updateGridOrListMode: Subject<boolean> = new Subject<boolean>();
  private _requestDataToSave: Subject<boolean> = new Subject<boolean>();
  private _errors: Subject<string[]> = new Subject<string[]>();
  private _allData: Subject<CsvDataInterface | null> = new Subject<CsvDataInterface | null>();
  private _saveData: Subject<CsvDataInterface> = new Subject<CsvDataInterface>();
  private _createNew: Subject<CsvDataInterface> = new Subject<CsvDataInterface>();

  constructor() { }

  setCurrentMode(value: boolean) : void {
    this._updateGridOrListMode.next(value);
  }

  getCurrentMode() : Subject<boolean> {
    return this._updateGridOrListMode;
  }

  setAllData(data: CsvDataInterface | null) : void {
    this._allData.next(data);
  }
  
  getAllData() : Subject<CsvDataInterface | null> {
    return this._allData;
  }

  setSaveData(data: CsvDataInterface) : void {
    this._saveData.next(data);
  }
  
  getSaveData() : Subject<CsvDataInterface> {
    return this._saveData;
  }
  
  setRequestDataToSave(value: boolean) : void {
    this._requestDataToSave.next(value);
  }

  getRequestDataToSave() : Subject<boolean> {
    return this._requestDataToSave;
  }

  setErrors(errors: string[]) : void {
    this._errors.next(errors);
  }

  getErrors() : Subject<string[]> {
    return this._errors;
  }

  setCreatenew(data: CsvDataInterface) : void {
    this._createNew.next(data);
  }

  getCreateNew() : Subject<CsvDataInterface> {
    return this._createNew;
  }

}
