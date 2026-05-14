import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
})
export class StatCardComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: number;
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) type: 'todo' | 'progress' | 'review' | 'done' = 'todo';
  @Input() active = false;

  @Output() clicked = new EventEmitter<void>();
}
