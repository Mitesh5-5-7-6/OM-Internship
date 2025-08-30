import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

  handleName(name: string, type: string) {
    console.log(name, type);
  }

  mouseEntered: string = 'mouse are not entered';

  handleMouseEnter(name: string) {
    console.log(name);
    this.mouseEntered = 'mouse are entered';
  }

  handleMouseLeave() {
    this.mouseEntered = 'mouse are not entered';
  }

}
