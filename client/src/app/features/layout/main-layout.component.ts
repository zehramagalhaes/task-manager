import { CommonModule } from '@angular/common';
import { Component, inject, signal, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { ModalService } from '../../core/services/modal.service';
import { TaskStore, type Task } from '../../core/store/task.store';
import { UserStore } from '../../core/store/user.store';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { ScrollContainerComponent } from '../../shared/components/scroll-container/scroll-container.component';
import { TaskModalComponent } from '../../shared/components/task-modal/task-modal.component';
import { UserAvatarComponent } from '../../shared/components/user-avatar/user-avatar.component';

/**
 * Main Layout component providing the sidebar and navigation structure.
 */
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ConfirmModalComponent,
    ScrollContainerComponent,
    TaskModalComponent,
    UserAvatarComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  // Configurable Props using Signal Inputs
  appName = input<string>('Task Manager');
  logoIcon = input<string>('task_alt');

  authService = inject(AuthService);
  store = inject(UserStore);
  taskStore = inject(TaskStore);
  modalService = inject(ModalService);

  currentYear = new Date().getFullYear();

  isMobileSidebarOpen = signal(false);
  isSidebarMinified = signal(false);
  isLogoutModalOpen = signal(false);
  isUserCardOpen = signal(false);

  toggleMobileSidebar(): void {
    this.isMobileSidebarOpen.update((v) => !v);
  }
  toggleMinify(): void {
    this.isSidebarMinified.update((v) => !v);
  }
  toggleUserCard(): void {
    this.isUserCardOpen.update((v) => !v);
  }
  openLogoutModal(): void {
    this.isLogoutModalOpen.set(true);
    this.isUserCardOpen.set(false);
  }
  onLogoutConfirm(): void {
    this.isLogoutModalOpen.set(false);
    this.authService.logout();
  }

  handleTaskSave(taskData: Omit<Task, 'id'> | Task): void {
    if ('id' in taskData) {
      this.taskStore.updateTask(taskData as Task);
    } else {
      this.taskStore.addTask(taskData);
    }
    this.modalService.closeTaskModal();
  }
}
