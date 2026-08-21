import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoFormComponent } from '../components/app-todo-form.component';
import { TodoFilterComponent } from '../components/app-todo-filter.component';
import { TodoListComponent } from '../components/app-todo-list.component';
import { ThemeToggleComponent } from '../../../../shared/components/toggle/app-theme-toggle.component';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { TodoStore } from '../state/todo.store';
import { TodoLocalStorageRepository } from '../../data/repositories/todo-local-storage.repository';
import { LangToggleComponent } from '../../../../shared/components/toggle/app-lang-toggle.component';
import { ListTodosUseCase } from '../../domain/use-cases/list-todos.use-case';
import { CreateTodoUseCase } from '../../domain/use-cases/create-todo.usecase';
import { UpdateTodoUseCase } from '../../domain/use-cases/update-todo.usecase';
import { ToggleTodoUseCase } from '../../domain/use-cases/toggle-todo.usecase';
import { DeleteTodoUseCase } from '../../domain/use-cases/delete-todo.usecase';
import { ClearCompletedUseCase } from '../../domain/use-cases/clear-completed.usecase';

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
    { provide: TodoRepository, useClass: TodoLocalStorageRepository },
    ListTodosUseCase,
    CreateTodoUseCase,
    UpdateTodoUseCase,
    ToggleTodoUseCase,
    DeleteTodoUseCase,
    ClearCompletedUseCase,
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