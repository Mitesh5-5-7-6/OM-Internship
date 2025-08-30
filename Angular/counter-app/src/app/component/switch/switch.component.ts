import { Component } from '@angular/core';

@Component({
  selector: 'app-switch',
  imports: [],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.css'
})
export class SwitchComponent {
  color: string = 'red'
  changeColor: string = ''

  handleChangeColor(val: string) {
    this.color = val;
  }

  getChangeColor(value: string) {
    this.changeColor = value
  }
}
