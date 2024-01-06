import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CsvDataInterface } from '../models/csv-data';

@Injectable({
  providedIn: 'root'
})
export class CsvApplicationService {

  private _updateGridOrListMode: Subject<boolean> = new Subject<boolean>();
  private _requestCurrentData: Subject<boolean> = new Subject<boolean>();
  private _errors: Subject<string[]> = new Subject<string[]>();

  private _allData: Subject<CsvDataInterface | null> = new Subject<CsvDataInterface | null>();
  private _saveData: Subject<CsvDataInterface> = new Subject<CsvDataInterface>();

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
  
  setRequestCurrentData(value: boolean) : void {
    this._requestCurrentData.next(value);
  }

  getRequestCurrentData() : Subject<boolean> {
    return this._requestCurrentData;
  }

  setErrors(errors: string[]) : void {
    this._errors.next(errors);
  }

  getErrors() : Subject<string[]> {
    return this._errors;
  }

}
