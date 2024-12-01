import { Component, InputSignal, OutputEmitterRef, input, output } from '@angular/core';

@Component({
  selector: 'app-button-with-image',
  templateUrl: './button-with-image.component.html',
  styleUrls: ['./button-with-image.component.css']
})
export class ButtonWithImageComponent {  
  imageSource: InputSignal<string> = input.required<string>();
  imageText: InputSignal<string> = input<string>('');  
  isDisabled: InputSignal<boolean> = input<boolean>(false);

  buttonAction: OutputEmitterRef<any> = output<any>();
}