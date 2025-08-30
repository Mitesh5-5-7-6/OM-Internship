import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../../investment.service';

interface calculateType {
  initialInvestment: number;
  annualInvestment: number;
  expectedReturn: number;
  duration: number;
}

@Component({
  selector: 'app-user-input',
  standalone: false,
  // imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  // @Output() calculate = new EventEmitter<calculateType>();
  enteredInitialInvestment = signal('0');
  enteredAnnualInvestment = signal('10');
  enteredExpectedReturn = signal('20');
  enteredDurationReturn = signal('30');

  constructor(private investmentService: InvestmentService) {

  }

  onSubmit() {
    this.investmentService.onCalculateInvestmentResults({
      initialInvestment: +this.enteredInitialInvestment(),
      duration: +this.enteredDurationReturn(),
      expectedReturn: +this.enteredExpectedReturn(),
      annualInvestment: +this.enteredAnnualInvestment()
    })
    this.enteredInitialInvestment.set('0')
    this.enteredDurationReturn.set('0')
    this.enteredExpectedReturn.set('0')
    this.enteredAnnualInvestment.set('0')
  }
}
