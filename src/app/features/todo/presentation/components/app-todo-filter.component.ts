import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { TodoStore } from '../state/todo.store';
import { TodoFilter } from '../../domain/entities/todo.entity';

@Component({
  selector: 'app-todo-filter',
  standalone: true,
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center justify-between gap-4">
      <div class="flex gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
        @for (f of filters; track f) {
          <button
            type="button"
            (click)="store.setFilter(f)"
            class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
            [class.bg-white]="store.filter() === f"
            [class.shadow-sm]="store.filter() === f"
            [class.text-primary-600]="store.filter() === f"
            [class.dark:bg-slate-700]="store.filter() === f"
            [class.dark:text-primary-400]="store.filter() === f"
            [class.text-slate-500]="store.filter() !== f"
            [class.dark:text-slate-400]="store.filter() !== f"
          >
            {{ ('filter.' + f) | translate }}
          </button>
        }
      </div>

      @if (store.completedCount() > 0) {
        <button
          type="button"
          (click)="store.clearCompleted()"
          class="text-sm text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400"
        >
          {{ 'filter.clearCompleted' | translate }}
        </button>
      }
    </div>
  `,
})
export class TodoFilterComponent {
  store = inject(TodoStore);
  filters: TodoFilter[] = ['all', 'active', 'completed'];
}