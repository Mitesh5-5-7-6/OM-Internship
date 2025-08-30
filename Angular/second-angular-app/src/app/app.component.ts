import { Component } from '@angular/core';
import { HeaderComponent } from "./component/header/header.component";
import { UserInputComponent } from "./component/user-input/user-input.component";
import { InvestmentResultComponent } from "./component/investment-result/investment-result.component";

@Component({
  selector: 'app-root',
  standalone: false,
  // imports: [HeaderComponent, UserInputComponent, InvestmentResultComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


}