import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { LoadCsv } from '../../methods/load-csv'
import { CreateCsv } from '../../methods/create-csv';
import { CsvSettings } from '../../models/csv-settings';
import { CsvLoadService } from '../../services/csv-load.service'
import { CsvApplicationService } from 'src/app/services/csv-application.service';
import { ShowCsvData } from 'src/app/methods/show-csv-data';
import { CsvDataInterface } from 'src/app/models/csv-data';

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
  public isCsvFileOpened: WritableSignal<boolean> = signal(false);

  constructor(
    private csvLoadService: CsvLoadService,
    private csvApplicationService: CsvApplicationService
  ) {}

  ngOnInit(): void {
    this.csvApplicationService.getSaveData().subscribe({
      next: (data) => {
        this.saveCsvFile(data);
      }
    });
  }

  getSelectedFile(file: File) : void {
    this._loadCsv.loadCsvFile(file, this.csvSettings).subscribe({
      next: (csvData) => {
        if(csvData) {
          this.csvApplicationService.setCurrentMode(true);
      
          if(!csvData.errors.hasErrors) {
            this.csvApplicationService.setAllData(csvData);
            this.csvApplicationService.setErrors([]);
            this.isCsvFileOpened.set(true);
          } else {
            this.csvApplicationService.setErrors(this.csvLoadService.getErrors());
            this.isCsvFileOpened.set(false);
          }
        } else {
          this.csvApplicationService.setErrors(['Unable to load CSV file.']);
        }
      }
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

  save() : void {
    this.csvApplicationService.setRequestCurrentData(true);
  }

  private saveCsvFile(data: CsvDataInterface) : void {
    let output: string = this._createCsv.create(data.headers,
                                                data.columns,
                                                data.columnLength,
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
    a.download = data.fileName;
    document.body.appendChild(a);

    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0);
  }

  closeFile() : void {    
    this.csvApplicationService.setAllData(null);
    this.csvApplicationService.setErrors([]);
    this.isCsvFileOpened.set(false);
  }

}