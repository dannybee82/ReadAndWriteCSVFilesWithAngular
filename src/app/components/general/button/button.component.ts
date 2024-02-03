import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	standalone: true,
	imports: [
		CommonModule,
	],
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})

export class ButtonComponent {
  @Input() text!: string;
  @Input() backgroundColor!: string;
  @Input() foregroundColor!: string;  
  @Output() buttonAction = new EventEmitter();
}