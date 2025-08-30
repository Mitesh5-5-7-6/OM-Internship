import { Component, computed, inject } from '@angular/core';
import { LearningResourcesComponent } from "./learning-resources/learning-resources.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [LearningResourcesComponent, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'directives';
  private AuthService = inject(AuthService);

  isAdmin = computed(() => this.AuthService.activePermission() === 'admin')
}
