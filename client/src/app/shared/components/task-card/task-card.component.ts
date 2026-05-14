import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { ModalService } from '../../../core/services/modal.service';
import { type Task } from '../../../core/store/task.store';
import { DropdownComponent, type DropdownItem } from '../dropdown/dropdown.component';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, DragDropModule, UserAvatarComponent, DropdownComponent],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  private modalService = inject(ModalService);

  @Input({ required: true }) task!: Task;

  @Input() assigneePhotoUrl?: string;
  @Input() assigneeName: string = 'User';
  @Input() dueDate: string = 'May 24';
  @Input() commentCount: number = 3;

  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  menuItems: DropdownItem[] = [
    { id: 'edit', label: 'Edit Task', icon: 'edit' },
    { id: 'delete', label: 'Delete Task', icon: 'delete', class: 'danger' },
  ];

  handleMenuAction(item: DropdownItem): void {
    if (item.id === 'edit') {
      this.modalService.openEditTask(this.task);
      this.edit.emit(this.task);
    } else if (item.id === 'delete') {
      this.delete.emit(this.task);
    }
  }
}
