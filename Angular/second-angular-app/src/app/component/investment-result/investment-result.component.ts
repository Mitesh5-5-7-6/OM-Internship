import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, Input, input } from '@angular/core';
import { InvestmentService } from '../../investment.service';

@Component({
  selector: 'app-investment-result',
  standalone: false,
  // imports: [CurrencyPipe],
  templateUrl: './investment-result.component.html',
  styleUrl: './investment-result.component.css'
})
export class InvestmentResultComponent {
  // results = input<InvestmentResultType[]>()
  // @Input() results?: InvestmentResultType[];

  private investmentService = inject(InvestmentService);

  results = computed(() => this.investmentService.resultData())
  // get results() {
  //   return this.investmentService.resultData;
  // }
}
