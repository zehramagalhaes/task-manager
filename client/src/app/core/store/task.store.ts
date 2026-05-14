import { computed } from '@angular/core';

import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  project: string;
}

export interface TaskState {
  tasks: Task[];
  searchQuery: string;
  selectedStatus: TaskStatus | 'all';
  isLoading: boolean;
}

const initialState: TaskState = {
  tasks: [
    {
      id: '1',
      title: 'Design System Update',
      description: 'Update color tokens and spacing variables',
      status: 'todo',
      priority: 'high',
      project: 'Task Flow',
    },
    {
      id: '2',
      title: 'Auth Service Cleanup',
      description: 'Remove unused imports and refactor observables',
      status: 'in-progress',
      priority: 'medium',
      project: 'Task Flow',
    },
    {
      id: '3',
      title: 'Kanban Implementation',
      description: 'Build drag and drop board with status columns',
      status: 'in-progress',
      priority: 'high',
      project: 'Task Flow',
    },
    {
      id: '4',
      title: 'Bug Fix: Nav Toggle',
      description: 'Fix issue where sidebar wont close on mobile',
      status: 'review',
      priority: 'medium',
      project: 'Admin',
    },
    {
      id: '5',
      title: 'Setup Vitest',
      description: 'Configure unit testing for core services',
      status: 'done',
      priority: 'low',
      project: 'Task Flow',
    },
    {
      id: '6',
      title: 'Landing Page Mockup',
      description: 'Create high-fidelity mockups for marketing',
      status: 'todo',
      priority: 'medium',
      project: 'Marketing',
    },
  ],
  searchQuery: '',
  selectedStatus: 'all',
  isLoading: false,
};

export const TaskStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ tasks, searchQuery, selectedStatus }) => ({
    filteredTasks: computed(() => {
      const query = searchQuery().toLowerCase();
      const status = selectedStatus();

      return tasks().filter((t) => {
        const matchesQuery =
          t.title.toLowerCase().includes(query) || t.description.toLowerCase().includes(query);
        const matchesStatus = status === 'all' || t.status === status;
        return matchesQuery && matchesStatus;
      });
    }),
    todoTasks: computed(() => tasks().filter((t) => t.status === 'todo')),
    inProgressTasks: computed(() => tasks().filter((t) => t.status === 'in-progress')),
    reviewTasks: computed(() => tasks().filter((t) => t.status === 'review')),
    doneTasks: computed(() => tasks().filter((t) => t.status === 'done')),
    isEmpty: computed(() => tasks().length === 0),
  })),
  withMethods((store) => ({
    setSearchQuery(query: string): void {
      patchState(store, { searchQuery: query });
    },
    setSelectedStatus(status: TaskStatus | 'all'): void {
      patchState(store, { selectedStatus: status });
    },
    updateTaskStatus(taskId: string, newStatus: TaskStatus): void {
      patchState(store, (state) => ({
        tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
      }));
    },
    addTask(task: Omit<Task, 'id'>): void {
      const newTask = { ...task, id: Math.random().toString(36).substring(7) };
      patchState(store, (state) => ({
        tasks: [...state.tasks, newTask],
      }));
    },
    updateTask(updatedTask: Task): void {
      patchState(store, (state) => ({
        tasks: state.tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
      }));
    },
    deleteTask(taskId: string): void {
      patchState(store, (state) => ({
        tasks: state.tasks.filter((t) => t.id !== taskId),
      }));
    },
    setLoading(isLoading: boolean): void {
      patchState(store, { isLoading });
    },
  }))
);
