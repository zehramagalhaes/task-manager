import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root component for the application.
 * Serves as the main layout container.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Task Manager';
}
