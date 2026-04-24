import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Dashboard component - main landing page.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {}
