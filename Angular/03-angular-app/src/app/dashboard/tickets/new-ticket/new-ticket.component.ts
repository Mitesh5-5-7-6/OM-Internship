import { Component, ElementRef, EventEmitter, output, Output, viewChild, ViewChild } from '@angular/core';
import { ControlComponent } from "../../../shared/control/control.component";
import { ButtonComponent } from "../../../shared/button/button.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  imports: [ControlComponent, ButtonComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {
  @ViewChild('ticketForm') private form?: ElementRef<HTMLFormElement>;
  // private form = viewChild.required<ElementRef<HTMLFormElement>>('ticketForm');
  // onSubmit(titleElement: HTMLInputElement, requestElement: HTMLTextAreaElement, ticketForm: HTMLFormElement): void {
  //   if (!titleElement.value || !requestElement.value) {
  //     alert("Please fill title and request fields");
  //     return;
  //   }
  //   console.log("Form submitted", titleElement.value, requestElement.value, ticketForm);
  //   ticketForm.reset();
  // }

  // @Output() add = new EventEmitter<{title:string; text:string}>();
  add = output<{ title: string; text: string }>();


  // Two-way data binding
  enteredTitle = '';
  enteredText = '';

  ngOnInit() {
    console.log('ONINIT');
    console.log(this.form?.nativeElement);
  }

  ngAfterViewInit() {
    console.log('AFTER VIEW INIT');
    console.log(this.form?.nativeElement);
  }

  // onSubmit(titleElement: HTMLInputElement, requestElement: HTMLTextAreaElement) {
  //   if (!titleElement.value || !requestElement.value) {
  //     alert("Please fill title and request fields");
  //     return;
  //   }

  //   this.form?.nativeElement.reset();
  // }
  // onSubmit(title: string, ticketText: string) {
  //   this.add.emit({ title: title, text: ticketText })
  //   this.form?.nativeElement.reset();
  // }

  // use two-way data binding
  onSubmit() {
    this.add.emit({ title: this.enteredTitle, text: this.enteredText })
    // this.form?.nativeElement.reset();
    this.enteredTitle = '';
    this.enteredText = '';
  }
}
