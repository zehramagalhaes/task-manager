import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // Configurable Props using Signal Inputs
  appName = input<string>('Task Manager');
  welcomeTitle = input<string>('Welcome Back');
  welcomeSubtitle = input<string>(
    'Elevate your productivity with our modern task management solution.'
  );
  googleBtnText = input<string>('Continue with Google');

  currentYear = new Date().getFullYear();

  onGoogleLogin(): void {
    // Redirect to the backend Google OAuth endpoint via the proxy
    window.location.href = '/api/auth/google';
  }
}
