import { Component, input } from '@angular/core';
import { ButtonComponent } from "../../shared/button/button.component";

@Component({
  selector: 'app-header',
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
}
