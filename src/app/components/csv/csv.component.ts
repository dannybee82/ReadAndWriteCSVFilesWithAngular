import { Component, OnInit } from '@angular/core';
import { LoadCsv } from '../../methods/load-csv'
import { CreateCsv } from '../../methods/create-csv';
import { CsvSettings } from '../../models/csv-settings';
import { CsvLoadService } from '../../services/csv-load.service'
import { CsvApplicationService } from 'src/app/services/csv-application.service';
import { ShowCsvData } from 'src/app/methods/show-csv-data';

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css']
})

export class CsvComponent implements OnInit {
  private _loadCsv: LoadCsv = new LoadCsv();
  private _createCsv: CreateCsv = new CreateCsv();
  private _showCsvData: ShowCsvData = new ShowCsvData();
  public csvSettings: CsvSettings = new CsvSettings();

  constructor(
    private csvLoadService: CsvLoadService,
    private csvApplicationService: CsvApplicationService
  ) {}

  ngOnInit(): void {}

  getSelectedFile(file: File) : void {
    this._loadCsv.getFile(file, this.csvSettings.isUtf8).then(testResult => {
      this.csvLoadService.setFileName(file.name);
      this.csvLoadService.setTotalLines(this._loadCsv.getAmountOfLines(testResult, this.csvSettings.firstRowIsHeader));

      if(this.csvSettings.firstRowIsHeader) {
        this.csvLoadService.setHeaders(this._loadCsv.getCsvHeaders(testResult, this.csvSettings.separator));
      } else {
        this.csvLoadService.setHeaders(null);
      }
      
      this.csvLoadService.setColumns(this._loadCsv.getCsvData(testResult, this.csvSettings.separator, this.csvSettings.enclosing, this.csvSettings.firstRowIsHeader));
      this.csvLoadService.setColumnsDefault(this._loadCsv.getCsvData(testResult, this.csvSettings.separator, this.csvSettings.enclosing, this.csvSettings.firstRowIsHeader));

      if(this.csvSettings.firstRowIsHeader) { 
        this.csvLoadService.setColumnLength(true, -1);
      } else {
        this.csvLoadService.setColumnLength(false, this._loadCsv.getFirstLineLength(testResult, this.csvSettings.separator));
      }

      let columnLength = this.csvLoadService.getColumnLength();
      this.csvLoadService.setErrors(this._loadCsv.checkCsvData(testResult, columnLength, this.csvSettings.separator, this.csvSettings.enclosing));

      this.csvApplicationService.setCurrentMode(true);
      
      if(this.csvLoadService.getErrors().length == 0) {
        this.csvApplicationService.setCurrentLoadedData(
            this._showCsvData.prepare(
            this.csvLoadService.getHeaders(),
            this.csvLoadService.getColumns(),
            this.csvLoadService.getTotalLines(),
            this.csvLoadService.getColumnLength()
          )
        );

        this.csvApplicationService.setErrors([]);
      } else {
        this.csvApplicationService.setErrors(this.csvLoadService.getErrors());
      }
      
      this.csvApplicationService.setCurrentData([]);
    });
  }

  onSeparatorChanged(separator: string) : void {
    this.csvSettings.separator = separator;
  }

  onEnclosingChanged(enclosing: string) : void {
    this.csvSettings.enclosing = enclosing;
  }

  onFirstRowHeaderChanged(firstRowIsHeader: boolean) : void {
    this.csvSettings.firstRowIsHeader = firstRowIsHeader;
  }

  onIsUtf8Changed(isUtf8: boolean) : void {
    this.csvSettings.isUtf8 = isUtf8;
  }

  saveCsvFile(value: any) : void {
    this.csvApplicationService.setRequestCurrentData(true);

    let columns: string[] = this._showCsvData.getColumnsFromData( this.csvApplicationService.getCurrentData() );

    let output: string = this._createCsv.create(this.csvLoadService.getHeaders(),
                                                columns,
                                                this.csvLoadService.getColumnLength(),
                                                this.csvSettings.separator, 
                                                this.csvSettings.enclosing, 
                                                this.csvSettings.firstRowIsHeader);

    let file: Blob;

    if(this.csvSettings.isUtf8) {
      file = new Blob([output], { type: 'text/csv;charset=utf-8' });      
    } else {
      file = new Blob([output], { type: 'text/csv' });
    }
    
    let a = document.createElement("a"), url = URL.createObjectURL(file);
    a.href = url;
    a.download = this.csvLoadService.getFileName();
    document.body.appendChild(a);

    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0);

    this.csvApplicationService.setCurrentData([]);
  }

  isCsvLoadedSuccessfully() : boolean {
    return this.csvLoadService.isCsvLoadedSuccessfully(); 
  }

}