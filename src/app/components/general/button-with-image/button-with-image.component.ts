import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-with-image',
  templateUrl: './button-with-image.component.html',
  styleUrls: ['./button-with-image.component.css']
})

export class ButtonWithImageComponent {  
  @Input() imageSource!: string;  
  @Input() imageText?: string = '';
  @Input() isDisabled: boolean = false;

  @Output() buttonAction = new EventEmitter();

  constructor() {}

}