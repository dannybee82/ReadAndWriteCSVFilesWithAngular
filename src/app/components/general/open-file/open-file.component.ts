import { Component, output, OutputEmitterRef, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-open-file',
  templateUrl: './open-file.component.html',
  styleUrls: ['./open-file.component.scss']
})
export class OpenFileComponent {
  imageSource: InputSignal<string> = input.required<string>();  
  imageText: InputSignal<string> = input<string>('');

  selectedFile: OutputEmitterRef<File> = output<File>();  
  
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