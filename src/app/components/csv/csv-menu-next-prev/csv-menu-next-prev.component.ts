import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-csv-menu-next-prev',
  templateUrl: './csv-menu-next-prev.component.html',
  styleUrls: ['./csv-menu-next-prev.component.css']
})
export class CsvMenuNextPrevComponent implements OnInit {
  @Input() currentItem: number = -1;
  @Input() totalItems: number = -1;
  
  @Input() disabledPrevButton: boolean = false;
  @Input() disabledNextButton: boolean = false;  
  @Input() disabledFirstButton: boolean = false;
  @Input() disabledLastButton: boolean = false;  
  @Input() disabledJumpToButton: boolean = false;

  @Output() previousButton: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() nextButton: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() firstButton: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() lastButton: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() jumpToIndex: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  previousOrNext(value: boolean) {
    if(value) {
      this.previousButton.emit(value);
    } else {
      this.nextButton.emit(value);
    }
  }

  firstOrLast(value: boolean) {
    if(value) {
      this.firstButton.emit(value);
    } else {
      this.lastButton.emit(value);
    }
  }

  jumpToRecord(value: string) {
    let parsed: number = parseInt(value) - 1;

    if(parsed >= 0 && parsed <= (this.totalItems - 1)) {
      this.jumpToIndex.emit(parsed);
    } else {
      alert("Invalid number specified.");
    }
  }

}