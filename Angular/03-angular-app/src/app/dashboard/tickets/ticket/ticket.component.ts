import { Component, Input, input, output, signal } from '@angular/core';
import { Ticket } from '../tickets.model';

@Component({
  selector: 'app-ticket',
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  data = input.required<Ticket>();
  close = output();
  detailsVisible = signal(false);

  onToggleDetails() {
    // this.detailsVisible.set(!this.detailsVisible());
    this.detailsVisible.update((prev) => !prev);
  }

  onMarkAsCompleted() {
    this.close.emit();
  }
}
