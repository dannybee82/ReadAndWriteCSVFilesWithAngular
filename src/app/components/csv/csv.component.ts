import { Component, OnInit, Output} from '@angular/core';
import { LoadCsv } from '../../methods/load-csv'
import { CreateCsv } from '../../methods/create-csv';
import { CsvSettings } from '../../models/csv-settings';
import { Subject } from 'rxjs';
import { CsvLoadService } from '../../services/csv-load.service'

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css']
})

export class CsvComponent implements OnInit {
  private _loadCsv: LoadCsv = new LoadCsv();
  private _createCsv: CreateCsv = new CreateCsv();
  public csvSettings: CsvSettings = new CsvSettings();
 
  @Output() requestToReloadData: Subject<boolean> = new Subject<boolean>();
  
  @Output() isGridModeSelected: boolean = true;

  constructor(private csvLoadService: CsvLoadService) {}

  ngOnInit(): void {}

  GetSelectedFile(file: File) {   
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
    let output: string = this._createCsv.create(this.csvLoadService.getHeaders(),
                                                this.csvLoadService.getColumns(),
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
  }

  isCsvLoadedSuccessfully() : boolean {
    return this.csvLoadService.isCsvLoadedSuccessfully(); 
  }

}