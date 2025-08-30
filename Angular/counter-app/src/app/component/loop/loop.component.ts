import { Component } from '@angular/core';

@Component({
  selector: 'app-loop',
  imports: [],
  templateUrl: './loop.component.html',
  styleUrl: './loop.component.css'
})
export class LoopComponent {
  users = ['Mitesh', 'Jay', 'Mit', 'ABC']
  students = [
    {
      id: 1,
      name: 'Mitesh',
      email: 'mitesh@gmail.com'
    },
    {
      id: 2,
      name: 'Jay',
      email: 'jayh@gmail.com'
    },
    {
      id: 3,
      name: 'Mit',
      email: 'mit@gmail.com'
    },
    {
      id: 4,
      name: 'ABC',
      email: 'abc@gmail.com'
    }
  ]

  getName(name: string) {
    console.log(name)
  }
}
