import { Injectable } from '@angular/core';
import { CsvErrors } from '../models/csv-errors';

@Injectable({
  providedIn: 'root'
})

export class CsvLoadService {
  private _csvFileName: string = '';  

  private _csvTotalLines: number = -1;

  private _csvHeaders: string[] | null = [];

  private _csvColumns: string[] = [];

  private _csvColumnsDefault: string[] = [];

  private _csvColumnLength: number = -1;  
  
  private _csvErrors: CsvErrors = new CsvErrors();

  private _csvLoadedSuccesfully: boolean = false;
  private _csvNoErrorWithColumnLength: boolean = false;

  constructor() { }

  setFileName(csvFileName: string) : void {
    this._csvFileName = csvFileName;
  }

  getFileName() : string {
    return this._csvFileName;
  }

  setTotalLines(csvTotalLines: number) : void {
    this._csvTotalLines = csvTotalLines;
  }

  getTotalLines() : number {
    return this._csvTotalLines;
  }

  setHeaders(headers: string[] | null) : void {
    this._csvHeaders = headers;
  }

  getHeaders() : string[] | null {
    return this._csvHeaders;
  }

  setColumns(columns: string[]) : void {
    this._csvColumns = columns;
  }

  getColumns() : string[] {
    return this._csvColumns;
  }

  setColumnsDefault(columnsDefault: string[]) : void {
    this._csvColumnsDefault = columnsDefault;
  }

  getColumnsDefault() : string[] {
    return this._csvColumnsDefault;
  }

  setColumnLength(isFirstLineHeader: boolean, useLength: number) : void {
    if(isFirstLineHeader && this._csvHeaders != null) {
      this._csvColumnLength = this._csvHeaders.length;
    } else {
      this._csvColumnLength = useLength;
    }
  }

  getColumnLength() : number {
    return this._csvColumnLength;
  }

  setErrors(errors: CsvErrors) : void {

    this._csvErrors = errors;

    this.checkForErrors();
  }

  getErrors() : string[] {
    return this._csvErrors.errors;
  }

  checkForErrors() : void {
    let total: number = (this._csvColumnLength * this._csvTotalLines);

    if(total == this._csvColumns.length && !this._csvErrors.hasErrors) {
      this._csvLoadedSuccesfully = true;
      this._csvNoErrorWithColumnLength = false;
    } else {
      this._csvLoadedSuccesfully = false;
      this._csvNoErrorWithColumnLength = true;
    }
  }

  isCsvLoadedSuccessfully() : boolean {
    return this._csvLoadedSuccesfully;
  }

  isColumnLengthOk() : boolean {
    return this._csvNoErrorWithColumnLength;
  }

}