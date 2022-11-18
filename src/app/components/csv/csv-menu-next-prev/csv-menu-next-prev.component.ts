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
  
  @Output() previousButton: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() nextButton: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  CallBackMethod(value: boolean) {
    if(value) {
      this.previousButton.emit(value);
    } else {
      this.nextButton.emit(value);
    }
  }

}