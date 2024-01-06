import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { LoadCsv } from '../../../methods/load-csv'
import { CreateCsv } from '../../../methods/create-csv';
import { CsvSettings } from '../../../models/csv-settings';
import { CsvApplicationService } from 'src/app/services/csv-application.service';
import { CsvDataInterface } from 'src/app/models/csv-data';

@Component({
  selector: 'app-csv-main',
  templateUrl: './csv-main.component.html',
  styleUrls: ['./csv-main.component.css']
})

export class CsvMainComponent implements OnInit {  
  
  public isCsvFileOpened: WritableSignal<boolean> = signal(false);
  public createNewFile: WritableSignal<boolean> = signal(false); 

  public csvSettings: CsvSettings = new CsvSettings();

  private _loadCsv: LoadCsv = new LoadCsv();
  private _createCsv: CreateCsv = new CreateCsv();

  constructor(
    private csvApplicationService: CsvApplicationService
  ) {}

  ngOnInit(): void {
    this.csvApplicationService.getSaveData().subscribe({
      next: (data) => {
        this.saveCsvFile(data);
      }
    });

    this.csvApplicationService.getCreateNew().subscribe({
      next: (data) => {
        this.createNewFile.set(false);
        this.csvApplicationService.setCurrentMode(true);
        this.csvApplicationService.setAllData(data);
        this.csvApplicationService.setErrors([]);
        this.isCsvFileOpened.set(true);
      }
    });
  }

  getSelectedFile(file: File) : void {
    this.createNewFile.set(false);

    this._loadCsv.loadCsvFile(file, this.csvSettings).subscribe({
      next: (csvData) => {
        if(csvData) {          
          this.csvApplicationService.setCurrentMode(true);
      
          if(!csvData.errors.hasErrors) {
            this.csvApplicationService.setAllData(csvData);
            this.csvApplicationService.setErrors([]);
            this.isCsvFileOpened.set(true);
          } else {
            this.csvApplicationService.setErrors(csvData.errors.errors);
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
    this.csvApplicationService.setRequestDataToSave(true);
  }

  closeFile() : void {    
    this.csvApplicationService.setAllData(null);
    this.csvApplicationService.setErrors([]);
    this.isCsvFileOpened.set(false);
  }

  createNew() : void {
    this.createNewFile.set(true);    
  }

  private saveCsvFile(data: CsvDataInterface) : void {
    let output: string = this._createCsv.create(data.headers, data.columns, data.columnLength, this.csvSettings);

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
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0);
  }

}