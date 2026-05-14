import { Injectable, signal } from '@angular/core';

import { type Task, type TaskStatus } from '../store/task.store';

/**
 * Service to manage global modal states
 */
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  // Task Modal State
  isTaskModalOpen = signal(false);
  selectedTask = signal<Task | null>(null);
  modalInitialStatus = signal<TaskStatus>('todo');

  openCreateTask(status: TaskStatus = 'todo'): void {
    this.selectedTask.set(null);
    this.modalInitialStatus.set(status);
    this.isTaskModalOpen.set(true);
  }

  openEditTask(task: Task): void {
    this.selectedTask.set(task);
    this.isTaskModalOpen.set(true);
  }

  closeTaskModal(): void {
    this.isTaskModalOpen.set(false);
    this.selectedTask.set(null);
  }
}
