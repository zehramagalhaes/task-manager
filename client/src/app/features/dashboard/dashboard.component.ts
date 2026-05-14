import { DragDropModule, type CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit, signal } from '@angular/core';

import { ModalService } from '../../core/services/modal.service';
import { TaskStore, type Task, type TaskStatus } from '../../core/store/task.store';
import { UserStore } from '../../core/store/user.store';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { ScrollContainerComponent } from '../../shared/components/scroll-container/scroll-container.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { TaskCardComponent } from '../../shared/components/task-card/task-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    ScrollContainerComponent,
    ConfirmModalComponent,
    TaskCardComponent,
    StatCardComponent,
  ],
  template: `
    <div class="dashboard-content">
      <!-- Header Area (Compact) -->
      <header class="page-header">
        <div class="header-main">
          <h1>Project Workspace</h1>
          <p class="text-muted">Manage your team's efficiency.</p>
        </div>

        <div class="search-bar glass-panel" [class.disabled]="taskStore.isLoading()">
          <span class="material-symbols-outlined">search</span>
          <input
            type="text"
            placeholder="Search tasks..."
            [disabled]="taskStore.isLoading()"
            [value]="taskStore.searchQuery()"
            (input)="onSearch($event)"
          />
        </div>
      </header>

      <!-- KPI Stats (Ultra Compact) -->
      <div class="stats-row" *ngIf="!taskStore.isLoading()">
        <app-stat-card
          label="To Do"
          [value]="taskStore.todoTasks().length"
          icon="list_alt"
          type="todo"
          [active]="taskStore.selectedStatus() === 'todo'"
          (clicked)="toggleStatusFilter('todo')"
        ></app-stat-card>
        <app-stat-card
          label="In Progress"
          [value]="taskStore.inProgressTasks().length"
          icon="trending_up"
          type="progress"
          [active]="taskStore.selectedStatus() === 'in-progress'"
          (clicked)="toggleStatusFilter('in-progress')"
        ></app-stat-card>
        <app-stat-card
          label="Review"
          [value]="taskStore.reviewTasks().length"
          icon="rate_review"
          type="review"
          [active]="taskStore.selectedStatus() === 'review'"
          (clicked)="toggleStatusFilter('review')"
        ></app-stat-card>
        <app-stat-card
          label="Done"
          [value]="taskStore.doneTasks().length"
          icon="check_circle"
          type="done"
          [active]="taskStore.selectedStatus() === 'done'"
          (clicked)="toggleStatusFilter('done')"
        ></app-stat-card>
      </div>

      <!-- Kanban Board -->
      <div
        class="kanban-board"
        cdkDropListGroup
        *ngIf="!taskStore.isLoading() && !taskStore.isEmpty()"
      >
        <div class="kanban-column" *ngFor="let col of columns">
          <div class="column-header">
            <div class="column-header-left">
              <span class="column-title">{{ col.title }}</span>
              <span class="column-count">{{ getTasksByStatus(col.id).length }}</span>
            </div>
            <button
              class="column-add-btn"
              *ngIf="col.id === 'todo'"
              (click)="modalService.openCreateTask('todo')"
              title="Add Task"
            >
              <span class="material-symbols-outlined">add</span>
            </button>
          </div>

          <app-scroll-container
            cdkDropList
            [cdkDropListData]="getTasksByStatus(col.id)"
            class="task-list-wrapper"
            padding="0 0.75rem 0.75rem 0"
            (cdkDropListDropped)="drop($event, col.id)"
          >
            <div class="task-list">
              <app-task-card
                *ngFor="let task of getTasksByStatus(col.id)"
                [task]="task"
                [assigneePhotoUrl]="userStore.user()?.photos?.[0]?.value"
                [assigneeName]="userStore.user()?.displayName || 'User'"
                cdkDrag
                [cdkDragData]="task"
                (delete)="confirmDelete($event)"
              >
                <div *cdkDragPlaceholder class="task-placeholder"></div>
              </app-task-card>

              <div class="empty-placeholder" *ngIf="getTasksByStatus(col.id).length === 0">
                <span class="material-symbols-outlined">drag_indicator</span>
                <p>Empty</p>
              </div>
            </div>
          </app-scroll-container>
        </div>
      </div>

      <!-- Global Empty State -->
      <div
        class="global-empty-state glass-panel"
        *ngIf="!taskStore.isLoading() && taskStore.isEmpty()"
      >
        <div class="empty-illustration">
          <span class="material-symbols-outlined">assignment_late</span>
        </div>
        <h2>No tasks</h2>
        <button class="btn-primary" (click)="modalService.openCreateTask()">Create Task</button>
      </div>

      <app-confirm-modal
        [isOpen]="isDeleteModalOpen()"
        title="Delete Task"
        message="Permanently delete this task?"
        icon="delete"
        confirmText="Delete"
        (confirm)="handleDeleteConfirm()"
        (cancel)="isDeleteModalOpen.set(false)"
      ></app-confirm-modal>
    </div>
  `,
  styles: [
    `
      .dashboard-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        height: 100%;
        overflow: hidden;
        padding-bottom: 0.5rem;
      }
      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
        flex-shrink: 0;
        margin-bottom: 0.25rem;
      }
      .header-main {
        h1 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.02em;
        }
        p {
          margin: 0;
          font-size: 0.8125rem;
          color: var(--text-muted);
        }
      }
      .search-bar {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.875rem;
        border-radius: 0.75rem;
        min-width: 260px;
        .material-symbols-outlined {
          color: var(--text-dim);
          font-size: 16px;
        }
        input {
          background: transparent;
          border: none;
          color: var(--text-main);
          outline: none;
          width: 100%;
          font-size: 0.8125rem;
          &::placeholder {
            color: var(--text-dim);
          }
        }
      }

      .stats-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        flex-shrink: 0;
      }

      .kanban-board {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.25rem;
        align-items: stretch;
        flex: 1;
        overflow: hidden;
        min-height: 0;
        margin-top: 0.5rem;
      }
      .kanban-column {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        height: 100%;
        overflow: hidden;
      }

      .column-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.25rem;
        flex-shrink: 0;
        .column-header-left {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }
        .column-title {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--text-main);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .column-count {
          background: rgba(255, 255, 255, 0.05);
          padding: 0.1rem 0.5rem;
          border-radius: 2rem;
          font-size: 0.625rem;
          color: var(--text-dim);
          font-weight: 800;
        }
      }
      .column-add-btn {
        width: 22px;
        height: 22px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--glass-border);
        color: var(--text-dim);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        &:hover {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }
        .material-symbols-outlined {
          font-size: 14px;
        }
      }

      .task-list-wrapper {
        flex: 1;
        min-height: 0;
        border-radius: 1rem;
      }
      .task-list {
        display: flex;
        flex-direction: column;
        gap: 0.625rem;
        padding-bottom: 1.5rem;
      }

      .task-placeholder {
        background: rgba(99, 102, 241, 0.05);
        border: 2px dashed rgba(99, 102, 241, 0.2);
        border-radius: 1rem;
        min-height: 80px;
      }

      .empty-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        padding: 1.5rem 1rem;
        border: 1.5px dashed var(--glass-border);
        border-radius: 1rem;
        text-align: center;
        color: var(--text-dim);
        opacity: 0.5;
        .material-symbols-outlined {
          font-size: 18px;
        }
        p {
          margin: 0;
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
        }
      }

      .global-empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem 2rem;
        text-align: center;
        gap: 1rem;
        border-radius: 1.5rem;
        .empty-illustration {
          color: var(--primary-light);
          .material-symbols-outlined {
            font-size: 32px;
          }
        }
        h2 {
          margin: 0;
          font-size: 1.125rem;
          color: var(--text-main);
        }
        .btn-primary {
          padding: 0.625rem 1.25rem;
          border-radius: 0.875rem;
          font-size: 0.875rem;
        }
      }

      @media (max-width: 1400px) {
        .stats-row,
        .kanban-board {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (max-width: 768px) {
        .page-header {
          flex-direction: column;
          align-items: stretch;
          gap: 0.75rem;
        }
        .stats-row,
        .kanban-board {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  userStore = inject(UserStore);
  taskStore = inject(TaskStore);
  modalService = inject(ModalService);

  isDeleteModalOpen = signal(false);
  taskToDelete = signal<string | null>(null);

  columns: { id: TaskStatus; title: string }[] = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'review', title: 'Review' },
    { id: 'done', title: 'Done' },
  ];

  ngOnInit(): void {
    this.taskStore.setLoading(true);
    setTimeout(() => {
      this.taskStore.setLoading(false);
    }, 1200);
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.taskStore.filteredTasks().filter((t) => t.status === status);
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.taskStore.setSearchQuery(input.value);
  }

  toggleStatusFilter(status: TaskStatus): void {
    const current = this.taskStore.selectedStatus();
    this.taskStore.setSelectedStatus(current === status ? 'all' : status);
  }

  drop(event: CdkDragDrop<Task[]>, newStatus: TaskStatus): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.item.data as Task;
      this.taskStore.updateTaskStatus(task.id, newStatus);
    }
  }

  confirmDelete(task: Task): void {
    this.taskToDelete.set(task.id);
    this.isDeleteModalOpen.set(true);
  }

  handleDeleteConfirm(): void {
    const id = this.taskToDelete();
    if (id) {
      this.taskStore.deleteTask(id);
      this.isDeleteModalOpen.set(false);
      this.taskToDelete.set(null);
    }
  }
}
