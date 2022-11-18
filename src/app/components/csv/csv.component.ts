import { Component, OnInit, Output} from '@angular/core';
import { LoadCsv } from '../../methods/load-csv'
import { CreateCsv } from '../../methods/create-csv';
import { CsvSettings } from '../../models/csv-settings';
import { Subject } from 'rxjs';
import { CsvData } from '../../models/csv-data';
import { CsvErrors } from '../../models/csv-errors';

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css']
})

export class CsvComponent implements OnInit {
  private _loadCsv: LoadCsv = new LoadCsv();
  private _createCsv: CreateCsv = new CreateCsv();
  public csvSettings: CsvSettings = new CsvSettings();

  @Output() isCsvLoaded: boolean = false;
  @Output() isCsvErrors: boolean = false;
  @Output() csvErrorsSummary: string[] = [];

  @Output() csvContent: string = '';
  @Output() csvHeaders: string[] | null = [];
  @Output() csvColumns: string[] = [];
  @Output() csvColumnsDefault: string[] = [];
  @Output() csvtotalLines: number = -1;
  @Output() csvUseLength: number = -1;
  @Output() csvFilename: string = '';

  @Output() requestToSaveCsv: Subject<boolean> = new Subject<boolean>();
  @Output() requestToReloadData: Subject<boolean> = new Subject<boolean>();

  @Output() isGridModeSelected: boolean = true;

  constructor() {}

  ngOnInit(): void {
  }

  GetSelectedFile(file: File) {   
    this._loadCsv.GetFile(file, this.csvSettings.isUtf8).then(testResult => {
      this.csvContent = testResult;

      this.csvFilename = file.name;
      this.csvtotalLines = this._loadCsv.GetAmountOfLines(this.csvContent); 

      this.csvHeaders = (this.csvSettings.firstRowIsHeader) ? this._loadCsv.GetCsvHeaders(this.csvContent, this.csvSettings.separator) : null;
            
      this.csvColumns = this._loadCsv.GetCsvData(this.csvContent, this.csvSettings.separator, this.csvSettings.enclosing);
      this.csvColumnsDefault = this._loadCsv.GetCsvData(this.csvContent, this.csvSettings.separator, this.csvSettings.enclosing);
      
      this.csvUseLength = 0;

      if(this.csvSettings.firstRowIsHeader) {
        if(this.csvHeaders != null) {
          this.csvUseLength  = this.csvHeaders?.length;
        }        
      } else {
        this.csvUseLength  = this._loadCsv.GetFirstLineLength(this.csvContent, this.csvSettings.separator);
      }       

      let total: number = this.csvUseLength  * this.csvtotalLines;

      let csvErrors: CsvErrors = this._loadCsv.CheckCsvData(this.csvContent, this.csvUseLength, this.csvSettings.separator, this.csvSettings.enclosing);

      if(total == this.csvColumns.length && !csvErrors.hasErrors) {
        this.isCsvLoaded = true;
        this.isCsvErrors = false;        
      } else {
        this.isCsvLoaded = false;
        this.isCsvErrors = true;  
        
        this.csvErrorsSummary = csvErrors.errors;
      }
      
      this.requestToReloadData.next(true);
    });
  }

  SetGridMode(value: boolean) {
    this.isGridModeSelected = value;
  }

  OnSeparatorChanged(separator: string) {
    this.csvSettings.separator = separator;
  }

  OnEnclosingChanged(enclosing: string) {
    this.csvSettings.enclosing = enclosing;
  }

  OnFirstRowHeaderChanged(firstRowIsHeader: boolean) {
    this.csvSettings.firstRowIsHeader = firstRowIsHeader;
  }

  OnIsUtf8Changed(isUtf8: boolean) {
    this.csvSettings.isUtf8 = isUtf8;
  }

  SaveCsvFile(value: any) : void {
    this.requestToSaveCsv.next(true);
  }

  CreateCsV(data: CsvData) : void {
    let output: string = this._createCsv.Create(data.headers, data.columns, data.useLength, this.csvSettings.separator, this.csvSettings.enclosing, this.csvSettings.firstRowIsHeader);

    let file: Blob;

    if(this.csvSettings.isUtf8) {
      file = new Blob([output], { type: 'text/csv;charset=utf-8' });      
    } else {
      file = new Blob([output], { type: 'text/csv' });
    }
    
    let a = document.createElement("a"), url = URL.createObjectURL(file);
    a.href = url;
    a.download = data.fileName;
    document.body.appendChild(a);

    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0);
  }

}