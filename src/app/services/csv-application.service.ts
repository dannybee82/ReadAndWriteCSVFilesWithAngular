import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SingleCsvRecord } from '../models/single-csv-record';

@Injectable({
  providedIn: 'root'
})
export class CsvApplicationService {

  private _currentData: SingleCsvRecord[] = [];
  private _updateGridOrListMode: Subject<boolean> = new Subject<boolean>();
  private _updateCurrentLoadedData: Subject<any[]> = new Subject<any[]>();
  private _requestCurrentData: Subject<boolean> = new Subject<boolean>();
  private _errors: Subject<string[]> = new Subject<string[]>();

  constructor() { }

  setCurrentMode(value: boolean) : void {
    this._updateGridOrListMode.next(value);
  }

  getCurrentMode() : Subject<boolean> {
    return this._updateGridOrListMode;
  }

  setCurrentLoadedData(data: any[]) : void {
    this._updateCurrentLoadedData.next(data);
  }

  getCurrentLoadedData() : Subject<any[]> {
    return this._updateCurrentLoadedData;
  }

  setRequestCurrentData(value: boolean) : void {
    this._requestCurrentData.next(value);
  }

  getRequestCurrentData() : Subject<boolean> {
    return this._requestCurrentData;
  }

  setCurrentData(data: SingleCsvRecord[]) : void {
    this._currentData = data;
  }  

  getCurrentData() : SingleCsvRecord[] {
    return this._currentData;
  }

  setErrors(errors: string[]) : void {
    this._errors.next(errors);
  }

  getErrors() : Subject<string[]> {
    return this._errors;
  }

}
