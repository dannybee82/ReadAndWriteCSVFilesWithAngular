import { Component, OnInit, inject } from '@angular/core';
import { CsvRecordsService } from 'src/app/services/csv-records.service';
import { CsvShowRecord } from 'src/app/models/csv-show-record';
import { ButtonComponent } from 'src/app/components/general/button/button.component';
import { ButtonWithImageComponent } from 'src/app/components/general/button-with-image/button-with-image.component';

@Component({
	standalone: true,
	imports: [
		ButtonComponent,
		ButtonWithImageComponent,
	],
  selector: 'app-csv-menu-next-prev',
  templateUrl: './csv-menu-next-prev.component.html',
  styleUrls: ['./csv-menu-next-prev.component.scss']
})
export class CsvMenuNextPrevComponent implements OnInit {
  public currentIndex: number = -1;
  public totalItems: number = -1;
  
  public disabledPrevButton: boolean = false;
  public disabledNextButton: boolean = false;  
  public disabledFirstButton: boolean = false;
  public disabledLastButton: boolean = false;  
  public disabledJumpToButton: boolean = false;

	private csvRecordsService = inject(CsvRecordsService);

  ngOnInit() : void {
    this.csvRecordsService.getCurrentCsvRecords().subscribe({
      next: (data) => {
        if(data) {
          this.currentIndex = data.currentIndex;
          this.totalItems = data.totalItems;
          this.updateMenu();
        }        
      }
    });
  }

  previousOrNext(isPrevious: boolean) : void {
    if(isPrevious) {
      this.currentIndex -= 1;
    } else {
      this.currentIndex += 1;
    }

    this.updateMenu();

    const data: CsvShowRecord = {
      currentIndex: this.currentIndex,
      totalItems: this.totalItems
    }

    this.csvRecordsService.setChangeCsvRecord(data);
  }

  firstOrLast(isFirst: boolean) : void {
    if(isFirst) {
      this.currentIndex = 0;
    } else {
      this.currentIndex = this.totalItems - 1;
    }

    this.updateMenu();

    const data: CsvShowRecord = {
      currentIndex: this.currentIndex,
      totalItems: this.totalItems
    }

    this.csvRecordsService.setChangeCsvRecord(data);
  }

  jumpToRecord(value: string) : void {
    let parsed: number = parseInt(value) - 1;

    if(parsed >= 0 && parsed <= (this.totalItems - 1)) {
      this.currentIndex = parsed;
      this.updateMenu();

      const data: CsvShowRecord = {
        currentIndex: this.currentIndex,
        totalItems: this.totalItems
      }
  
      this.csvRecordsService.setChangeCsvRecord(data);
    } else {
      alert("Invalid number specified.");
    }
  }

  private updateMenu() : void {
    this.disabledPrevButton = (this.currentIndex - 1 >= 0) ? false : true;
    this.disabledNextButton = (this.currentIndex + 1 < this.totalItems) ? false : true;
    this.disabledFirstButton = (this.currentIndex - 1 >= 0) ? false : true;
    this.disabledLastButton = (this.currentIndex + 1 < this.totalItems) ? false : true;
    this.disabledJumpToButton = (this.totalItems == 1) ? true : false;
  }

}