import { Component, WritableSignal, signal, inject, OnInit } from '@angular/core';
import { SingleCsvRecord } from '../../../models/single-csv-record';
import { CsvChangeData } from '../../../models/csv-change-data'
import { CsvApplicationService } from 'src/app/services/csv-application.service';
import { CsvDataInterface } from 'src/app/models/csv-data';
import { CsvRecordsService } from 'src/app/services/csv-records.service';
import { CsvShowRecord } from 'src/app/models/csv-show-record';
import { ButtonComponent } from 'src/app/components/general/button/button.component';
import { ButtonWithImageComponent } from 'src/app/components/general/button-with-image/button-with-image.component';
import { CsvMenuNextPrevComponent } from 'src/app/components/csv/csv-menu-next-prev/csv-menu-next-prev.component';
import { CsvChangePopupComponent } from 'src/app/components/csv/csv-change-popup/csv-change-popup.component';

@Component({
	standalone: true,
	imports: [
		ButtonComponent,
		ButtonWithImageComponent,
		CsvMenuNextPrevComponent,
		CsvChangePopupComponent,
	],
  selector: 'app-csv-content',
  templateUrl: './csv-content.component.html',
  styleUrls: ['./csv-content.component.css']
})
export class CsvContentComponent implements OnInit {

  public isCsvLoaded: WritableSignal<boolean> = signal(false);
  public isGridMode: WritableSignal<boolean> = signal(true);
  public errors: WritableSignal<string[]> = signal([]);

  public csvHeaders: string[] | null = [];
  public totalAmountOfLines: number = 0;
  public allColumns: SingleCsvRecord[][] = [];
  public currentPageIndex: number = 0;

  private _workData: CsvDataInterface | null = null;
   
  public isPopupVisible: boolean = false;

  public changeDataId: number = -1;
  public changeDataHeader: string = '';
  public changeDataColumn: string = '';
  public changeDataColumnDefault: string = ''; 

	private csvApplicationService = inject(CsvApplicationService);
	private csvRecordsService = inject(CsvRecordsService);

  ngOnInit(): void {
    this.csvApplicationService.getAllData().subscribe({
      next: (result) => {
        if(result) {
          this.setAllColumns(result.columns, result.headers, result.columnLength);
          this.totalAmountOfLines = result.totalLines;
          this.csvHeaders = result.headers;
          this.isCsvLoaded.set(true);
          this._workData = result;

          const currentIndex: CsvShowRecord = {
            currentIndex: this.currentPageIndex,
            totalItems: result.totalLines
          }
          this.csvRecordsService.setCurrentCsvRecords(currentIndex);
        } else {
          this.allColumns = [];
          this.totalAmountOfLines = 0;
          this.csvHeaders = null;
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
          this.currentPageIndex = data.currentIndex;
          this.getCurrentDataPair();
        }        
      }
    });
  }

  getCurrentDataPair() : SingleCsvRecord[] {
    return this.allColumns[this.currentPageIndex];
  }

  getRowsToGenerate(): number[] {
    let n: number[] = [];

    for(let i = 0; i < this.allColumns.length; i++) {
      n.push(i);
    }

    return n;
  }

  getCellsToGenerate(index: number): string[] {
    let cells: string[] = [];

    let currentData: SingleCsvRecord[] = this.allColumns[index];

    currentData.forEach(item => {
      cells.push(item.column);
    });

    return cells;
  }
  
  gotoRecord(recordNumber: number) : void {    
    this.currentPageIndex = recordNumber;
    this.getCurrentDataPair();
    this.csvApplicationService.setCurrentMode(false);

    const data: CsvShowRecord = {
      currentIndex: recordNumber,
      totalItems: this.totalAmountOfLines
    };
    
    this.csvRecordsService.setCurrentCsvRecords(data);
  }

  showPopupWithDetails(id: number, header: string, column: string, defaultValue: string) : void {
    this.changeDataId = id;
    this.changeDataHeader = header;
    this.changeDataColumn = column;
    this.changeDataColumnDefault = defaultValue;

    this.isPopupVisible = true;
  }

  changePopupVisibility(value: boolean) : void {
    this.isPopupVisible = value;
  }

  changeData(data: CsvChangeData) : void {
    let index: number = data.id;
    let currentData: SingleCsvRecord[] = this.allColumns[this.currentPageIndex];
    currentData[index].column = data.changedValue;
  }

  limitStringLength(subject: string) : string {
    if(subject.length > 50) {
      return subject.substring(0, 46) + " ...";
    }    

    return subject;
  }

  testDataChanged(index: number, column: number) : boolean {
    let currentData: SingleCsvRecord[] = this.allColumns[index];

    if(currentData[column].column !== currentData[column].defaultValue) {
      return true;
    }

    return false;
  }

  private setAllColumns(columns: string[], headers: string[] | null, columnLength: number) : void {
    this.allColumns = [];
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
        this.allColumns.push(row);
      }
    }
  }

  private getAllColumns() : string[] {
    let data: string[] = [];

    this.allColumns.forEach(element => {
      let currentColumn: SingleCsvRecord[] = element;

      for(let i = 0; i < currentColumn.length; i++) {
        data.push(currentColumn[i].column);
      }
    });

    return data;
  }

}