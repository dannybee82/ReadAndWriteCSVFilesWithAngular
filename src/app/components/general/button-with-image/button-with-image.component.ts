import { Component, InputSignal, OutputEmitterRef, input, output } from '@angular/core';

@Component({
  selector: 'app-button-with-image',
  templateUrl: './button-with-image.component.html',
  styleUrls: ['./button-with-image.component.scss']
})
export class ButtonWithImageComponent {  
  readonly imageSource: InputSignal<string> = input.required<string>();
  readonly imageText: InputSignal<string> = input<string>('');  
  readonly isDisabled: InputSignal<boolean> = input<boolean>(false);

  readonly buttonAction: OutputEmitterRef<boolean> = output<boolean>();
}