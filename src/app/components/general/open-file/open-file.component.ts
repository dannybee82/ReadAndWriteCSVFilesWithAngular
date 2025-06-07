import { Component, output, OutputEmitterRef, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-open-file',
  templateUrl: './open-file.component.html',
  styleUrls: ['./open-file.component.scss']
})
export class OpenFileComponent {
  readonly imageSource: InputSignal<string> = input.required<string>();  
  readonly imageText: InputSignal<string> = input<string>('');

  readonly selectedFile: OutputEmitterRef<File> = output<File>();  
  
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