import { Component } from '@angular/core';

@Component({
  selector: 'app-get-set',
  imports: [],
  templateUrl: './get-set.component.html',
  styleUrl: './get-set.component.css'
})
export class GetSetComponent {
  firstname: string = "firstname"
  lastname: string = "lastname"
  fullname: string = "fullname"

  getUserFirstName(value: string) {
    this.firstname = value;
  }

  getUserLastName(value: string) {
    this.lastname = value;
  }

  setUserFullName() {
    this.fullname = this.firstname + " " + this.lastname
  }
}
