import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from 'src/app/components/general/button/button.component';
import { ButtonWithImageComponent } from 'src/app/components/general/button-with-image/button-with-image.component';

@Component({
	standalone: true,
	imports: [
		ButtonComponent,
		ButtonWithImageComponent,
	],
  selector: 'app-csv-settings',
  templateUrl: './csv-settings.component.html',
  styleUrls: ['./csv-settings.component.css']
})

export class CsvSettingsComponent {
  public isMenuVisible: boolean = false;
  
  @Input() csvSeparator: string = '';
  @Input() csvEnclosing: string = '';
  @Input() csvFirstRowIsHeader: boolean = true;
  @Input() csvIsUtf8: boolean = true;

  @Output() csvSeparatorChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() csvEnclosingChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() csvFirstRowIsHeaderChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() csvIsUtf8Changed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

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