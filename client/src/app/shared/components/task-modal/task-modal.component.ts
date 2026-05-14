import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  type OnInit,
  type OnChanges,
  type SimpleChanges,
  inject,
} from '@angular/core';
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { type Task, type TaskStatus } from '../../../core/store/task.store';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss',
})
export class TaskModalComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);

  @Input() isOpen = false;
  @Input() task: Task | null = null;
  @Input() initialStatus: TaskStatus = 'todo';

  // Configurable Props
  @Input() createTitle = 'Create New Task';
  @Input() editTitle = 'Edit Task';
  @Input() titleLabel = 'Title';
  @Input() titlePlaceholder = 'What needs to be done?';
  @Input() titleErrorMsg = 'Title is required (min 3 chars)';
  @Input() descLabel = 'Description';
  @Input() descPlaceholder = 'Add more details...';
  @Input() descErrorMsg = 'Description is required';
  @Input() saveBtnText = 'Save Changes';
  @Input() createBtnText = 'Create Task';
  @Input() cancelBtnText = 'Cancel';

  @Output() save = new EventEmitter<Omit<Task, 'id'> | Task>();
  @Output() cancel = new EventEmitter<void>();

  taskForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
    status: ['todo'],
    priority: ['medium'],
    project: ['Task Manager', [Validators.required]],
  });

  ngOnInit(): void {
    this.updateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] || (changes['isOpen'] && this.isOpen)) {
      this.updateForm();
    }
  }

  private updateForm(): void {
    if (this.task) {
      this.taskForm.patchValue(this.task);
    } else {
      this.taskForm.reset({
        title: '',
        description: '',
        status: this.initialStatus || 'todo',
        priority: 'medium',
        project: 'Task Manager',
      });
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.taskForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value as Omit<Task, 'id'>;
      if (this.task) {
        this.save.emit({ ...this.task, ...formValue });
      } else {
        this.save.emit(formValue);
      }
      this.close();
    }
  }

  close(): void {
    this.cancel.emit();
    this.taskForm.reset({
      title: '',
      description: '',
      status: this.initialStatus || 'todo',
      priority: 'medium',
      project: 'Task Manager',
    });
  }
}
