import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

export interface DropdownItem {
  id: string;
  label: string;
  icon: string;
  class?: string;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dropdown-container">
      <button
        class="dropdown-trigger"
        (mousedown)="toggle($event)"
        type="button"
        [class.active]="isOpen()"
      >
        <ng-content select="[trigger]"></ng-content>
      </button>

      <div
        class="dropdown-menu solid-panel shadow-xl"
        *ngIf="isOpen()"
        (mousedown)="$event.stopPropagation()"
      >
        <button
          *ngFor="let item of items"
          (mousedown)="selectItem($event, item)"
          type="button"
          class="dropdown-item"
          [class]="item.class || ''"
        >
          <span class="material-symbols-outlined">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </button>
      </div>
    </div>

    <!-- Overlay to close on click outside -->
    <div class="dropdown-overlay" *ngIf="isOpen()" (mousedown)="close($event)"></div>
  `,
  styles: [
    `
      .dropdown-container {
        position: relative;
        display: inline-block;
      }

      .dropdown-trigger {
        background: transparent;
        border: none;
        padding: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }

      .dropdown-menu {
        position: absolute;
        top: 100%;
        right: 0;
        width: 180px;
        margin-top: 0.5rem;
        padding: 0.375rem;
        border-radius: 0.875rem;
        z-index: 100000;
        display: flex;
        flex-direction: column;
        gap: 1px;
        animation: dropdownPop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.1);
      }

      .dropdown-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        width: 100%;
        border: none;
        background: transparent;
        color: #cbd5e1;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        border-radius: 0.625rem;
        transition: all 0.15s ease;
        text-align: left;

        &:hover {
          background: #334155;
          color: #fff;
        }

        &.danger {
          color: #f87171;
          &:hover {
            background: rgba(239, 68, 68, 0.15);
            color: #ff8a8a;
          }
        }

        .material-symbols-outlined {
          font-size: 20px;
        }
      }

      .solid-panel {
        background: #1a1c23;
        border: 1px solid #2d313d;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
      }

      .dropdown-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 99999;
        background: transparent;
      }

      @keyframes dropdownPop {
        from {
          opacity: 0;
          transform: scale(0.95) translateY(-5px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
    `,
  ],
})
export class DropdownComponent {
  @Input() items: DropdownItem[] = [];
  @Output() action = new EventEmitter<DropdownItem>();

  isOpen = signal(false);

  toggle(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.isOpen.update((v) => !v);
  }

  close(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.isOpen.set(false);
  }

  selectItem(event: Event, item: DropdownItem): void {
    event.stopPropagation();
    event.preventDefault();
    this.action.emit(item);
    this.isOpen.set(false);
  }
}
