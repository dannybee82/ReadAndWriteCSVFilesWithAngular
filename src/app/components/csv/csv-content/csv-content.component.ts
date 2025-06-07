import { Component, WritableSignal, signal, inject, OnInit } from '@angular/core';
import { SingleCsvRecord } from '../../../models/single-csv-record';
import { CsvChangeData } from '../../../models/csv-change-data.interface'
import { CsvApplicationService } from '../../../services/csv-application.service';
import { CsvData } from '../../../models/csv-data.interface';
import { CsvRecordsService } from '../../../services/csv-records.service';
import { CsvShowRecord } from '../../../models/csv-show-record';
import { ButtonWithImageComponent } from '../../general/button-with-image/button-with-image.component';
import { CsvMenuNextPrevComponent } from '../csv-menu-next-prev/csv-menu-next-prev.component';
import { CsvChangePopupComponent } from '../csv-change-popup/csv-change-popup.component';

@Component({
	imports: [
		ButtonWithImageComponent,
		CsvMenuNextPrevComponent,
		CsvChangePopupComponent,
	],
  selector: 'app-csv-content',
  templateUrl: './csv-content.component.html',
  styleUrls: ['./csv-content.component.scss']
})
export class CsvContentComponent implements OnInit {

  protected isCsvLoaded: WritableSignal<boolean> = signal(false);
  protected isGridMode: WritableSignal<boolean> = signal(true);
  protected errors: WritableSignal<string[]> = signal([]);

  protected csvHeaders: WritableSignal<string[] | null> = signal([]);
  protected totalAmountOfLines: WritableSignal<number> = signal(0);
  protected allColumns: WritableSignal<SingleCsvRecord[][]> = signal([]);
  protected currentPageIndex: WritableSignal<number> = signal(0);

  private _workData: CsvData | null = null;
   
  protected isPopupVisible: WritableSignal<boolean> = signal(false);

  protected changeDataId: WritableSignal<number> = signal(-1);
  protected changeDataHeader: WritableSignal<string> = signal('');
  protected changeDataColumn: WritableSignal<string> = signal('');
  protected changeDataColumnDefault: WritableSignal<string> = signal(''); 

	private csvApplicationService = inject(CsvApplicationService);
	private csvRecordsService = inject(CsvRecordsService);

  ngOnInit(): void {
    this.csvApplicationService.getAllData().subscribe({
      next: (result) => {
        if(result) {
          this.setAllColumns(result.columns, result.headers, result.columnLength);
          this.totalAmountOfLines.set(result.totalLines);
          this.csvHeaders.set(result.headers);
          this._workData = result;

          const currentIndex: CsvShowRecord = {
            currentIndex: this.currentPageIndex(),
            totalItems: result.totalLines
          }
          this.csvRecordsService.setCurrentCsvRecords(currentIndex);          
          this.isCsvLoaded.set(true);
        } else {
          this.allColumns.set([]);
          this.totalAmountOfLines.set(0);
          this.csvHeaders.set(null);
          this.isCsvLoaded.set(false);
        }
      }
    });

    this.csvApplicationService.getRequestDataToSave().subscribe({
      next: (result) => {
        if(this._workData) {
          this._workData.columns = this.getAllColumns();
          this.csvApplicationService.setSaveData(this._workData);
        }
      }
    });

    this.csvApplicationService.getCurrentMode().subscribe({
      next: (result) => {
        this.isGridMode.set(result);
      }
    });

    this.csvApplicationService.getErrors().subscribe({
      next: (result) => {
        this.errors.set(result);
      }
    });

    this.csvRecordsService.getChangeCsvRecord().subscribe({
      next: (data) => {
        if(data) {
          this.currentPageIndex.set(data.currentIndex);
          this.getCurrentDataPair();
        }        
      }
    });
  }

  getCurrentDataPair(): SingleCsvRecord[] {
    return this.allColumns()[this.currentPageIndex()];
  }

  getRowsToGenerate(): number[] {
    let n: number[] = [];

    for(let i = 0; i < this.allColumns().length; i++) {
      n.push(i);
    }

    return n;
  }

  getCellsToGenerate(index: number): string[] {
    let cells: string[] = [];

    let currentData: SingleCsvRecord[] = this.allColumns()[index];

    currentData.forEach(item => {
      cells.push(item.column);
    });

    return cells;
  }
  
  gotoRecord(recordNumber: number): void {    
    this.currentPageIndex.set(recordNumber);
    this.getCurrentDataPair();
    this.csvApplicationService.setCurrentMode(false);

    const data: CsvShowRecord = {
      currentIndex: recordNumber,
      totalItems: this.totalAmountOfLines()
    };
    
    this.csvRecordsService.setCurrentCsvRecords(data);
  }

  showPopupWithDetails(id: number, header: string, column: string, defaultValue: string): void {
    this.changeDataId.set(id);
    this.changeDataHeader.set(header);
    this.changeDataColumn.set(column);
    this.changeDataColumnDefault.set(defaultValue);

    this.isPopupVisible.set(true);
  }

  changePopupVisibility(value: boolean): void {
    this.isPopupVisible.set(value);
  }

  changeData(data: CsvChangeData): void {
    let index: number = data.id;
    let currentData: SingleCsvRecord[] = this.allColumns()[this.currentPageIndex()];
    currentData[index].column = data.changedValue;
  }

  limitStringLength(subject: string): string {
    if(subject.length > 50) {
      return subject.substring(0, 46) + " ...";
    }    

    return subject;
  }

  testDataChanged(index: number, column: number): boolean {
    let currentData: SingleCsvRecord[] = this.allColumns()[index];

    if(currentData[column].column !== currentData[column].defaultValue) {
      return true;
    }

    return false;
  }

  private setAllColumns(columns: string[], headers: string[] | null, columnLength: number): void {
    this.allColumns.set([]);
    let index: number = 0;
    let row: SingleCsvRecord[] = [];

    for(let i = 0; i < columns.length; i++) {
      if(index == 0) {
        row = [];
      }

      let record: SingleCsvRecord = new SingleCsvRecord(index, headers != null ? headers[index] : '', columns[i], columns[i]);
      row.push(record);
      index++;

      if(index == columnLength) {
        index = 0;
        this.allColumns().push(row);
      }
    }
  }

  private getAllColumns(): string[] {
    let data: string[] = [];

    this.allColumns().forEach(element => {
      let currentColumn: SingleCsvRecord[] = element;

      for(let i = 0; i < currentColumn.length; i++) {
        data.push(currentColumn[i].column);
      }
    });

    return data;
  }

}