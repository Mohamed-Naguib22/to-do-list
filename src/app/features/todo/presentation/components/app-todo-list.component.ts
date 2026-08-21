import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { TodoItemComponent } from './app-todo-item.component';
import { TodoStore } from '../state/todo.store';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (store.filteredTodos().length) {
      <ul class="flex flex-col gap-2">
        @for (todo of store.filteredTodos(); track todo.id) {
          <app-todo-item [todo]="todo" />
        }
      </ul>
    } @else {
      <p class="py-10 text-center text-sm text-slate-400 dark:text-slate-500">
        {{ emptyKey() | translate }}
      </p>
    }
  `,
})
export class TodoListComponent {
  store = inject(TodoStore);

  emptyKey(): string {
    switch (this.store.filter()) {
      case 'active':
        return 'empty.active';
      case 'completed':
        return 'empty.completed';
      default:
        return 'empty.all';
    }
  }
}