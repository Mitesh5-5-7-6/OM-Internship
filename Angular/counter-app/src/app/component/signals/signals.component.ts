import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  imports: [],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.css'
})
export class SignalsComponent {
  data = 10;
  count = signal(10);

  constructor() {
    effect(() => {
      console.log(this.data)
      console.log(this.count())
    })
  }

  updateValue(val: string) {
    if (val === 'add') {
      this.count.set(this.count() + 1)
    } else {
      this.count.set(this.count() - 1)
    }
  }
}
