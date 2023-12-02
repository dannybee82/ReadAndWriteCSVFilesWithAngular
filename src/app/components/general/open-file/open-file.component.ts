import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-open-file',
  templateUrl: './open-file.component.html',
  styleUrls: ['./open-file.component.css']
})

export class OpenFileComponent {
  @Input() imageSource!: string;  
  @Input() imageText?: string = '';
  
  @Output() selectedFile: EventEmitter<File> = new EventEmitter<File>();

  constructor() {}

  onFileSelected(event: any) {
    const file:File = event.target.files[0];

    if (file) {
        this.selectedFile.emit(file);
    }
  }

}