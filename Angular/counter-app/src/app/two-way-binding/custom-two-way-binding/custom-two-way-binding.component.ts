import { Component, EventEmitter, input, Input, model, Output } from '@angular/core';

@Component({
  selector: 'app-custom-two-way-binding',
  imports: [],
  templateUrl: './custom-two-way-binding.component.html',
  styleUrl: './custom-two-way-binding.component.css'
})
export class CustomTwoWayBindingComponent {
  // @Input({ required: true }) size?: { width: string; height: string };
  // @Output() sizeChange = new EventEmitter<{ width: string; height: string }>();

  // new angular 17+
  size = model.required<{ width: string; height: string }>();

  // input size name but output in write same name size+Change then auto detected as two way binding
  // @Output() sizeChange = new EventEmitter<{ width: string; height: string }>();
  // app in write [size] to [(size)] in html

  onReset() {
    this.size.set({ //update
      width: '200',
      height: '100'
    })
  }
}
