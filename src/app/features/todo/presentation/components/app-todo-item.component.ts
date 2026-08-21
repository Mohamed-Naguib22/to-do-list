import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { AppCheckboxComponent } from '../../../../shared/components/checkbox/app-checkbox.component';
import { AppButtonComponent } from '../../../../shared/components/button/app-button.component';
import { AppInputComponent } from '../../../../shared/components/input/app-input.component';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { TodoStore } from '../state/todo.store';
import { Todo } from '../../domain/entities/todo.entity';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [AppCheckboxComponent, AppButtonComponent, AppInputComponent, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <li
      class="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3
             dark:border-slate-800 dark:bg-slate-800/50"
    >
      @if (editing()) {
        <div class="flex flex-1 items-center gap-2">
          <app-input [(value)]="draft" class="flex-1" />
          <app-button variant="primary" (clicked)="save()">
            {{ 'item.save' | translate }}
          </app-button>
          <app-button variant="ghost" (clicked)="cancel()">
            {{ 'item.cancel' | translate }}
          </app-button>
        </div>
      } @else {
        <app-checkbox
          [checked]="todo().completed"
          (checkedChange)="store.toggle(todo().id)"
        />
        <span
          class="flex-1 text-sm"
          [class.line-through]="todo().completed"
          [class.text-slate-400]="todo().completed"
          [class.dark:text-slate-500]="todo().completed"
        >
          {{ todo().title }}
        </span>
        <div class="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <app-button variant="ghost" (clicked)="edit()">
            {{ 'item.edit' | translate }}
          </app-button>
          <app-button variant="danger" (clicked)="store.remove(todo().id)">
            {{ 'item.delete' | translate }}
          </app-button>
        </div>
      }
    </li>
  `,
})
export class TodoItemComponent {
  store = inject(TodoStore);
  todo = input.required<Todo>();

  editing = signal(false);
  draft = signal('');

  edit(): void {
    this.draft.set(this.todo().title);
    this.editing.set(true);
  }

  save(): void {
    this.store.update(this.todo().id, this.draft());
    if (!this.store.error()) {
      this.editing.set(false);
    }
  }

  cancel(): void {
    this.editing.set(false);
    this.store.clearError();
  }
}