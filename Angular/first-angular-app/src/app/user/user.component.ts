import { Component, computed, EventEmitter, input, Input, Output, output } from '@angular/core';
import { type User } from './user.model';
import { CardComponent } from "../shared/card/card.component";

@Component({
  selector: 'app-user',
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  // zone
  @Input({ required: true }) user?: User;
  @Input({ required: true }) selected!: boolean;
  // @Input({ required: true }) id?: string;
  // @Input({ required: true }) avatar?: string;
  // @Input({ required: true }) name?: string;

  // signal
  // id = input.required<string>();
  // avatar = input.required<string>();
  // name = input.required<string>();

  @Output() select = new EventEmitter<string>();
  // select = output<string | undefined>();

  // imagePath = computed(() => {
  //   return 'assets/users/' + this.avatar();
  // })
  get imagePath() {
    return 'assets/users/' + this.user?.avatar;
  }

  onSelectUser() {
    this.select.emit(this.user?.id);
  }
}