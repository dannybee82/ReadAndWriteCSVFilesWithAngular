import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	standalone: true,
  selector: 'app-open-file',
  templateUrl: './open-file.component.html',
  styleUrls: ['./open-file.component.css']
})

export class OpenFileComponent {
  @Input() imageSource!: string;  
  @Input() imageText?: string = '';
  
  @Output() selectedFile: EventEmitter<File> = new EventEmitter<File>();
  
  onFileSelected(event: Event) {
    const element: HTMLInputElement = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;

    if(fileList) {
      const file: File = fileList[0];

      if (file) {
        this.selectedFile.emit(file);
      }
    }
  }

}