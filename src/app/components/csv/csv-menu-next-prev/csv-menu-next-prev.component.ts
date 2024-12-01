import { Component, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { CsvRecordsService } from 'src/app/services/csv-records.service';
import { CsvShowRecord } from 'src/app/models/csv-show-record';
import { ButtonWithImageComponent } from 'src/app/components/general/button-with-image/button-with-image.component';

@Component({
	imports: [
		ButtonWithImageComponent,
	],
  selector: 'app-csv-menu-next-prev',
  templateUrl: './csv-menu-next-prev.component.html',
  styleUrls: ['./csv-menu-next-prev.component.scss']
})
export class CsvMenuNextPrevComponent implements OnInit {
  currentIndex: WritableSignal<number> = signal(-1);
  totalItems: WritableSignal<number> = signal(-1);
  
  disabledPrevButton: Signal<boolean> = computed<boolean>(() => (this.currentIndex() - 1 >= 0) ? false : true);
  disabledNextButton: Signal<boolean> = computed<boolean>(() => (this.currentIndex() + 1 < this.totalItems()) ? false : true);
  disabledFirstButton: Signal<boolean> = computed<boolean>(() => (this.currentIndex() - 1 >= 0) ? false : true);
  disabledLastButton: Signal<boolean> = computed<boolean>(() => (this.currentIndex() + 1 < this.totalItems()) ? false : true);
  disabledJumpToButton: Signal<boolean> = computed<boolean>(() => (this.totalItems() <= 1) ? true : false);

	private csvRecordsService = inject(CsvRecordsService);

  ngOnInit() : void {
    this.csvRecordsService.getCurrentCsvRecords().subscribe({
      next: (data) => {
        if(data) {
          this.currentIndex.set(data.currentIndex);
          this.totalItems.set(data.totalItems);
        }        
      }
    });
  }

  previousOrNext(isPrevious: boolean) : void {
    if(isPrevious) {
      this.currentIndex.set(this.currentIndex() - 1);
    } else {
      this.currentIndex.set(this.currentIndex() + 1);
    }

    const data: CsvShowRecord = {
      currentIndex: this.currentIndex(),
      totalItems: this.totalItems()
    }

    this.csvRecordsService.setChangeCsvRecord(data);
  }

  firstOrLast(isFirst: boolean) : void {
    if(isFirst) {
      this.currentIndex.set(0);
    } else {
      this.currentIndex.set(this.totalItems() - 1);
    }

    const data: CsvShowRecord = {
      currentIndex: this.currentIndex(),
      totalItems: this.totalItems()
    }

    this.csvRecordsService.setChangeCsvRecord(data);
  }

  jumpToRecord(value: string) : void {
    let parsed: number = parseInt(value) - 1;

    if(parsed >= 0 && parsed <= (this.totalItems() - 1)) {
      this.currentIndex.set(parsed);

      const data: CsvShowRecord = {
        currentIndex: this.currentIndex(),
        totalItems: this.totalItems()
      }
  
      this.csvRecordsService.setChangeCsvRecord(data);
    } else {
      alert("Invalid number specified.");
    }
  }

}