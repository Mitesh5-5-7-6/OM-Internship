import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-computed-signal',
  imports: [],
  templateUrl: './computed-signal.component.html',
  styleUrl: './computed-signal.component.css'
})
export class ComputedSignalComponent {
  x = signal(10);
  y = signal(20);
  w = this.x() + this.y();
  z = computed(() => this.x() + this.y());

  showValue() {
    console.log(this.w);
    console.log(this.z());
  }
  updateX() {
    this.x.set(100)
  }

  // Effect in Signal
  name = signal("Mitesh")

  // constructor means is class property it automatically call thai jiyare ae no instance create thai...
  constructor() {
    effect(() => {
      console.log(this.name())
    })
  }
}
