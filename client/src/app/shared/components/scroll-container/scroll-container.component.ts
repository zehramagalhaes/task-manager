import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scroll-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-container.component.html',
  styleUrl: './scroll-container.component.scss',
})
export class ScrollContainerComponent {
  @Input() padding: string = '0';
}
