import { Directive, inject, input, effect } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]'
})
export class AuthDirective {
  userType = input.required<Permission>();
  private authService = inject(AuthService);

  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        console.log('SHOW ELEMENT');

      } else {
        console.log('DO NOT SHOW ELEMENT');

      }
    });
  }
}