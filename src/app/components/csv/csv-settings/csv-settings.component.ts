import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-csv-settings',
  templateUrl: './csv-settings.component.html',
  styleUrls: ['./csv-settings.component.css']
})

export class CsvSettingsComponent implements OnInit {
  public isMenuVisible: boolean = false;
  
  @Input() csvSeparator: string = '';
  @Input() csvEnclosing: string = '';
  @Input() csvFirstRowIsHeader: boolean = true;
  @Input() csvIsUtf8: boolean = true;

  @Output() csvSeparatorChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() csvEnclosingChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() csvFirstRowIsHeaderChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() csvIsUtf8Changed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  showMenu() : void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  changeString(id: number, value: string) : void {
    if(id == 0) {
      this.csvSeparatorChanged.emit(value);
    } else {
      this.csvEnclosingChanged.emit(value);
    }
  }

  changeBoolean(id: number, value: boolean) : void {
    if(id == 0) {
      this.csvFirstRowIsHeaderChanged.emit(value);
    } else {
      this.csvIsUtf8Changed.emit(value);
    }
  }

}