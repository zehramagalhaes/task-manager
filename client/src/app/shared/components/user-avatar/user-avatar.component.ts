import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
})
export class UserAvatarComponent {
  photoUrl = input<string | undefined>();
  name = input<string>('User');
  size = input<'sm' | 'md' | 'lg' | 'xl'>('md');
  border = input<boolean>(true);

  initials = computed(() => {
    const nameValue = this.name() || 'User';
    const parts = nameValue.trim().split(' ');

    if (parts.length >= 2) {
      const first = parts[0]?.[0] || '';
      const last = parts[parts.length - 1]?.[0] || '';
      return (first + last).toUpperCase() || 'U';
    }

    return (parts[0]?.[0] || 'U').toUpperCase();
  });

  // Unique background color based on name
  bgColor = computed(() => {
    const nameValue = this.name() || 'User';
    const colors = [
      '#6366f1',
      '#10b981',
      '#f59e0b',
      '#ef4444',
      '#8b5cf6',
      '#ec4899',
      '#06b6d4',
      '#f97316',
    ];
    let hash = 0;
    for (let i = 0; i < nameValue.length; i++) {
      hash = nameValue.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  });
}
