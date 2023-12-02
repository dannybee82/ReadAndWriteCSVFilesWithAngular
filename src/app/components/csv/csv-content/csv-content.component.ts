import { Component, Output, Injectable, WritableSignal, signal } from '@angular/core';
import { SingleCsvRecord } from '../../../models/single-csv-record';
import { CsvChangeData } from '../../../models/csv-change-data'
import { CsvLoadService } from '../../../services/csv-load.service'
import { CsvApplicationService } from 'src/app/services/csv-application.service';

@Component({
  selector: 'app-csv-content',
  templateUrl: './csv-content.component.html',
  styleUrls: ['./csv-content.component.css']
})

@Injectable()

export class CsvContentComponent {
  public isCsvLoaded: WritableSignal<boolean> = signal(false);
  public isGridMode: WritableSignal<boolean> = signal(true);
  public errors: WritableSignal<string[]> = signal([]);
  public showValues: WritableSignal<boolean> = signal(true);

  public csvHeaders: string[] | null = [];

  public totalAmountOfLines: number = 0;

  public allData: any[] = [];

  public currentPageIndex: number = 0;
  
  @Output() isPrevButtonEnabled: boolean = true;
  @Output() isNextButtonEnabled: boolean = true;
  @Output() isFirstButtonEnabled: boolean = true;
  @Output() isLastButtonEnabled: boolean = true;
  @Output() isJumpToButtonEnabled: boolean = true;

  @Output() isPopupVisible: boolean = false;

  @Output() changeDataId: number = -1;
  @Output() changeDataHeader: string = '';
  @Output() changeDataColumn: string = '';
  @Output() changeDataColumnDefault: string = ''; 

  constructor(
    private csvLoadService: CsvLoadService,
    private csvApplicationService: CsvApplicationService
  ) {}

  ngOnInit(): void {
    this.csvApplicationService.getCurrentLoadedData().subscribe({
      next: (result) => {
        this.allData = result;
        this.totalAmountOfLines = this.allData.length;

        this.csvHeaders = this.csvLoadService.getHeaders();
        this.isCsvLoaded.set(true);
      }      
    });

    this.csvApplicationService.getRequestCurrentData().subscribe({
      next: (result) => {
        this.csvApplicationService.setCurrentData(this.allData);
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
  }

  getCurrentDataPair() : SingleCsvRecord[] {
    this.updateMenu();
    return this.allData[this.currentPageIndex];
  }

  getRowsToGenerate(): number[] {
    let n: number[] = [];

    for(let i = 0; i < this.allData.length; i++) {
      n.push(i);
    }

    return n;
  }

  getCellsToGenerate(index: number): string[] {
    let cells: string[] = [];

    let currentData: SingleCsvRecord[] = this.allData[index];

    currentData.forEach(item => {
      cells.push(item.column);
    });

    return cells;
  }

  updateMenu() {
    this.isPrevButtonEnabled = (this.currentPageIndex - 1 >= 0) ? false : true;
    this.isNextButtonEnabled = (this.currentPageIndex + 1 < this.totalAmountOfLines) ? false : true;
    this.isFirstButtonEnabled = (this.currentPageIndex - 1 >= 0) ? false : true;
    this.isLastButtonEnabled = (this.currentPageIndex + 1 < this.totalAmountOfLines) ? false : true;
    this.isJumpToButtonEnabled = (this.totalAmountOfLines == 1) ? true : false;
  }

  previousOrNextRecord(value: boolean) {
    this.currentPageIndex = (value) ? this.currentPageIndex -= 1 : this.currentPageIndex += 1;

    if(this.currentPageIndex < 0) {
      this.currentPageIndex = 0;
    }

    if(this.currentPageIndex > this.totalAmountOfLines) {
      this.currentPageIndex = this.totalAmountOfLines - 1;
    }

    this.getCurrentDataPair();
  }

  firstOrLastRecord(value: boolean) {
    this.currentPageIndex = (value) ? 0 : this.totalAmountOfLines - 1;
    this.updateMenu();
    this.getCurrentDataPair();
  }
  
  gotoPage(pageNumber: number) {    
    this.currentPageIndex = pageNumber;
    this.updateMenu();
    this.getCurrentDataPair();
    this.csvApplicationService.setCurrentMode(false);
  }

  showPopupWithDetails(id: number, header: string, column: string, defaultValue: string) {
    this.changeDataId = id;
    this.changeDataHeader = header;
    this.changeDataColumn = column;
    this.changeDataColumnDefault = defaultValue;

    this.isPopupVisible = true;
  }

  changePopupVisibility(value: boolean) {
    this.isPopupVisible = value;
  }

  changeData(data: CsvChangeData) {
    let index: number = data.id;
    let currentData: SingleCsvRecord[] = this.allData[this.currentPageIndex];
    currentData[index].column = data.changedValue;
  }

  limitStringLength(subject: string) : string {
    if(subject.length > 50) {
      return subject.substring(0, 46) + " ...";
    }    

    return subject;
  }

  testDataChanged(index: number, column: number) : boolean {
    let currentData: SingleCsvRecord[] = this.allData[index];

    if(currentData[column].column !== currentData[column].defaultValue) {
      return true;
    }

    return false;
  }

}