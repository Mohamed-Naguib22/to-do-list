import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoFormComponent } from '../components/app-todo-form.component';
import { TodoFilterComponent } from '../components/app-todo-filter.component';
import { TodoListComponent } from '../components/app-todo-list.component';
import { ThemeToggleComponent } from '../../../../shared/components/toggle/app-theme-toggle.component';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { TodoStore } from '../state/todo.store';
import { LangToggleComponent } from '../../../../shared/components/toggle/app-lang-toggle.component';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [
    TodoFormComponent,
    TodoFilterComponent,
    TodoListComponent,
    ThemeToggleComponent,
    LangToggleComponent,
    TranslatePipe,
  ],
  providers: [
    TodoStore,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto min-h-screen max-w-xl px-4 py-10 sm:py-16">
      <header class="mb-8 flex items-start justify-between">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">
            {{ 'app.title' | translate }}
          </h1>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {{ 'app.subtitle' | translate: { count: store.completedCount(), total: store.total() } }}
          </p>
        </div>
        <div class="flex items-center gap-1">
          <app-lang-toggle />
          <app-theme-toggle />
        </div>
      </header>

      <div class="flex flex-col gap-5">
        <app-todo-form />
        @if (store.total() > 0) {
          <app-todo-filter />
        }
        <app-todo-list />
      </div>
    </div>
  `,
})
export class TodoPageComponent {
  store = inject(TodoStore);
}