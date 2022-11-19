import { Component, Input, Output, EventEmitter, Injectable } from '@angular/core';
import { SingleCsvRecord } from '../../../models/single-csv-record';
import { Subject } from 'rxjs';
import { CsvChangeData } from '../../../models/csv-change-data'
import { CsvLoadServiceService } from '../../../services/csv-load-service.service'

@Component({
  selector: 'app-csv-content',
  templateUrl: './csv-content.component.html',
  styleUrls: ['./csv-content.component.css']
})

@Injectable()

export class CsvContentComponent {
  public csvIsLoaded: boolean = false;
  public csvNoErrors: boolean = true;
  public csvHeaders: string[] | null = [];
  public csvColumns: string[] = [];
  public csvColumnsDefault: string[] = [];  
  public csvtotalLines: number = -1;
  public csvUseColumnLength: number = -1;
  public csvFilename: string = '';
  public csvErrors: string[] = [];

  @Input() currentPageIndex: number = 0;

  @Input() requestToReloadData: Subject<boolean> = new Subject<boolean>();

  @Input() useGridMode: boolean = true;

  @Output() isPrevButtonEnabled: boolean = true;
  @Output() isNextButtonEnabled: boolean = true;

  @Output() gridModeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() isPopupVisible: boolean = false;

  @Output() changeDataId: number = -1;
  @Output() changeDataHeader: string = '';
  @Output() changeDataColumn: string = '';
  @Output() changeDataColumnDefault: string = ''; 

  constructor(public csvLoadServiceService: CsvLoadServiceService) {}

  ngOnInit(): void {
    this.requestToReloadData.subscribe(v => { 
      this.currentPageIndex = 0;
      this.csvIsLoaded = this.csvLoadServiceService.isCsvLoadedSuccesfully();
      this.csvNoErrors = this.csvLoadServiceService.isColumnLengthOk();
      this.csvFilename = this.csvLoadServiceService.getFileName();
      this.csvHeaders = this.csvLoadServiceService.getHeaders();
      this.csvColumns = this.csvLoadServiceService.getColumns();
      this.csvColumnsDefault = this.csvLoadServiceService.getColumnsDefault();
      this.csvtotalLines = this.csvLoadServiceService.getTotalLines();
      this.csvUseColumnLength = this.csvLoadServiceService.getColumnLength();
      this.csvErrors = this.csvLoadServiceService.getErrors();
    }); 
  }

  GetCurrentData() : string[] {
    let currentData: string[] = [];

    let start: number  = (this.currentPageIndex * this.csvUseColumnLength);
    let end: number = (this.currentPageIndex * this.csvUseColumnLength) + this.csvUseColumnLength;
    let index: number = 0;

    for(let i = start; i < end; i++) {
      currentData[index] = this.csvColumns[i];
      index++;
    }

    return currentData;
  }
  
  GetDefaultData() : string[] {
    let defaultData: string[] = [];

    let start: number  = (this.currentPageIndex * this.csvUseColumnLength);
    let end: number = (this.currentPageIndex * this.csvUseColumnLength) + this.csvUseColumnLength;
    let index: number = 0;

    for(let i = start; i < end; i++) {
      defaultData[index] = this.csvColumnsDefault[i];
      index++;
    }

    return defaultData;
  }

  GetDataPairs() : SingleCsvRecord[] {
    let dataPairs: SingleCsvRecord[] = [];

    let currentData: string[] = this.GetCurrentData();
    let defaultData: string[] = this.GetDefaultData();

    let startIndex: number  = (this.currentPageIndex * this.csvUseColumnLength);

    for(let i = 0; i < currentData.length; i++) { 
        let headerValue = (this.csvHeaders != null) ? this.csvHeaders[i] : "";   
        const record: SingleCsvRecord = new SingleCsvRecord(startIndex, headerValue, currentData[i], defaultData[i]);
        dataPairs.push(record);
        startIndex++;
    }

    this.UpdateMenu();

    return dataPairs;
  }

  GetRowsToGenerate(): number[] {
    let n: number[] = [];

    for(let i = 0; i < this.csvtotalLines; i++) {
      n.push(i);
    }

    return n;
  }

  GetCellsToGenerate(row: number): string[] {
    let cells: string[] = [];

    let start: number  = (row * this.csvUseColumnLength);
    let end: number = (row * this.csvUseColumnLength) + this.csvUseColumnLength;
    let index: number = 0;

    for(let i = start; i < end; i++) {
      cells[index] = this.csvColumns[i];
      index++;
    }

    return cells;
  }

  UpdateMenu() {
    this.isPrevButtonEnabled = (this.currentPageIndex - 1 >= 0) ? false : true;
    this.isNextButtonEnabled = (this.currentPageIndex + 1 < this.csvtotalLines) ? false : true;    
  }

  UpdatePageIndex(value: boolean) {
    this.currentPageIndex = (value) ? this.currentPageIndex -= 1 : this.currentPageIndex += 1;

    if(this.currentPageIndex < 0) {
      this.currentPageIndex = 0;
    }

    if(this.currentPageIndex > this.csvtotalLines) {
      this.currentPageIndex = this.csvtotalLines - 1;
    }
  }
  
  GotoPage(pageNumber: number) {        
    this.currentPageIndex = pageNumber;
    this.UpdateMenu();
    this.useGridMode = false;
    this.gridModeChanged.emit(this.useGridMode);
  }

  ShowPopupWithDetails(id: number, header: string, column: string, defaultValue: string) {
    this.changeDataId = id;
    this.changeDataHeader = header;
    this.changeDataColumn = column;
    this.changeDataColumnDefault = defaultValue;

    this.isPopupVisible = true;
  }

  ChangePopupVisibility(value: boolean) {
    this.isPopupVisible = value;
  }

  ChangeData(data: CsvChangeData) {
    let index: number = data.id;
    let value: string = data.changedValue;

    this.csvColumns[index] = value;
  }

  LimitStringLength(subject: string) : string {
    if(subject.length > 50) {
      return subject.substring(0, 46) + " ...";
    }    

    return subject;
  }

  TestDataChanged(row: number, column: number) : boolean {
    let index: number = (row * this.csvUseColumnLength) + column;

    if(this.csvColumns[index] !== this.csvColumnsDefault[index]) {
      return true;
    }

    return false;
  }

}