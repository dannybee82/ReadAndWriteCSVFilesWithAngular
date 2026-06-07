import { Component, OnInit, WritableSignal, signal, inject } from '@angular/core';
import { LoadCsv } from '../../../methods/load-csv'
import { CreateCsv } from '../../../methods/create-csv';
import { CsvSettings } from '../../../models/csv-settings';
import { CsvApplication } from '../../../services/csv-application';
import { CsvData } from '../../../models/csv-data.interface';
import { OpenFile } from '../../general/open-file/open-file';
import { CsvProperties } from '../csv-properties/csv-properties';
import { ButtonWithImage } from '../../general/button-with-image/button-with-image';
import { CsvViewMode } from '../csv-view-mode/csv-view-mode';
import { CsvContent } from '../csv-content/csv-content';
import { CsvCreateNew } from '../csv-create-new/csv-create-new';
import { ScrollToTop } from '../../general/scroll-to-top/scroll-to-top';

@Component({
	imports: [
		OpenFile,
		CsvProperties,
		ButtonWithImage,    
		CsvViewMode,
		CsvContent,
		CsvCreateNew,
		ScrollToTop,
	],
  selector: 'app-csv-main',
  templateUrl: './csv-main.html',
  styleUrls: ['./csv-main.scss']
})
export class CsvMain implements OnInit {  
  
  protected isCsvFileOpened: WritableSignal<boolean> = signal(false);
  protected createNewFile: WritableSignal<boolean> = signal(false); 

  protected csvSettings: WritableSignal<CsvSettings> = signal(new CsvSettings());

  private _loadCsv: LoadCsv = new LoadCsv();
  private _createCsv: CreateCsv = new CreateCsv();

	private csvApplicationService = inject(CsvApplication);

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

  getSelectedFile(file: File): void {
    this.createNewFile.set(false);

    this._loadCsv.loadCsvFile(file, this.csvSettings()).subscribe({
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

  save(): void {
    this.csvApplicationService.setRequestDataToSave(true);
  }

  closeFile(): void {    
    this.csvApplicationService.setAllData(null);
    this.csvApplicationService.setErrors([]);
    this.isCsvFileOpened.set(false);
  }

  createNew(): void {
    this.createNewFile.set(true);    
  }

  private saveCsvFile(data: CsvData): void {
    let output: string = this._createCsv.create(data.headers, data.columns, data.columnLength, this.csvSettings());

    let file: Blob;

    if(this.csvSettings().isUtf8) {
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