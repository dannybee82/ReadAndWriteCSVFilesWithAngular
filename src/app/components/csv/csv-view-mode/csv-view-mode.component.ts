import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-csv-view-mode',
  templateUrl: './csv-view-mode.component.html',
  styleUrls: ['./csv-view-mode.component.css']
})
export class CsvViewModeComponent implements OnInit {
  @Input() isGridMode: boolean = true;

  @Output() getIsGridMode: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit(): void {
  }

  SetViewMode(viewMode: boolean) {
    this.isGridMode = viewMode;
    this.getIsGridMode.emit(this.isGridMode);
  }

}
