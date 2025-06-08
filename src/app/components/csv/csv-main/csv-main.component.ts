import { Component, OnInit, WritableSignal, signal, inject } from '@angular/core';
import { LoadCsv } from '../../../methods/load-csv'
import { CreateCsv } from '../../../methods/create-csv';
import { CsvSettings } from '../../../models/csv-settings';
import { CsvApplicationService } from '../../../services/csv-application.service';
import { CsvData } from '../../../models/csv-data.interface';
import { OpenFileComponent } from '../../general/open-file/open-file.component';
import { CsvSettingsComponent } from '../csv-settings/csv-settings.component';
import { ButtonWithImageComponent } from '../../general/button-with-image/button-with-image.component';
import { CsvViewModeComponent } from '../csv-view-mode/csv-view-mode.component';
import { CsvContentComponent } from '../csv-content/csv-content.component';
import { CsvCreateNewComponent } from '../csv-create-new/csv-create-new.component';
import { ScrollToTopComponent } from '../../general/scroll-to-top/scroll-to-top.component';

@Component({
	imports: [
		OpenFileComponent,
		CsvSettingsComponent,
		ButtonWithImageComponent,
		CsvViewModeComponent,
		CsvContentComponent,
		CsvCreateNewComponent,
		ScrollToTopComponent,
	],
  selector: 'app-csv-main',
  templateUrl: './csv-main.component.html',
  styleUrls: ['./csv-main.component.scss']
})
export class CsvMainComponent implements OnInit {  
  
  protected isCsvFileOpened: WritableSignal<boolean> = signal(false);
  protected createNewFile: WritableSignal<boolean> = signal(false); 

  protected csvSettings: WritableSignal<CsvSettings> = signal(new CsvSettings());

  private _loadCsv: LoadCsv = new LoadCsv();
  private _createCsv: CreateCsv = new CreateCsv();

	private csvApplicationService = inject(CsvApplicationService);

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