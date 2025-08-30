import { Component, input, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'button[appButton], a[appButton], app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  // encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
  // btnName = input.required<string>();
}
