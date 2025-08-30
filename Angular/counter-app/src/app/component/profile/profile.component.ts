import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  display: boolean = true


  handleBtn(val: string) {
    if (val === 'Show') {
      this.display = true
    } else {
      this.display = false
    }
  }

  handleToggle() {
    this.display = !this.display
  }

  displayDiv: boolean = false
  toggleDivs() {
    this.displayDiv = !this.displayDiv
  }
}
