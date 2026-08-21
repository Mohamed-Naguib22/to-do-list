import { Injectable, computed, inject, signal } from '@angular/core';
import { Todo, TodoFilter } from '../../domain/entities/todo.entity';
import { UpdateTodoUseCase } from '../../domain/use-cases/update-todo.usecase';
import { ListTodosUseCase } from '../../domain/use-cases/list-todos.use-case';
import { DeleteTodoUseCase } from '../../domain/use-cases/delete-todo.usecase';
import { ClearCompletedUseCase } from '../../domain/use-cases/clear-completed.usecase';
import { ToggleTodoUseCase } from '../../domain/use-cases/toggle-todo.usecase';
import { CreateTodoUseCase } from '../../domain/use-cases/create-todo.usecase';

@Injectable()
export class TodoStore {
  private listUseCase = inject(ListTodosUseCase);
  private createUseCase = inject(CreateTodoUseCase);
  private updateUseCase = inject(UpdateTodoUseCase);
  private toggleUseCase = inject(ToggleTodoUseCase);
  private deleteUseCase = inject(DeleteTodoUseCase);
  private clearCompletedUseCase = inject(ClearCompletedUseCase);

  private readonly _todos = signal<Todo[]>(this.listUseCase.execute());
  private readonly _filter = signal<TodoFilter>('all');
  private readonly _error = signal<string | null>(null);

  readonly todos = this._todos.asReadonly();
  readonly filter = this._filter.asReadonly();
  readonly error = this._error.asReadonly();

  readonly filteredTodos = computed(() => {
    const todos = this._todos();
    switch (this._filter()) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  });

  readonly total = computed(() => this._todos().length);
  readonly completedCount = computed(
    () => this._todos().filter((t) => t.completed).length,
  );
  readonly activeCount = computed(() => this.total() - this.completedCount());

  add(title: string): void {
    try {
      this._todos.set(this.createUseCase.execute(title));
      this._error.set(null);
    } catch (err) {
      this._error.set((err as Error).message);
    }
  }

  update(id: string, title: string): void {
    try {
      this._todos.set(this.updateUseCase.execute(id, title));
      this._error.set(null);
    } catch (err) {
      this._error.set((err as Error).message);
    }
  }

  toggle(id: string): void {
    this._todos.set(this.toggleUseCase.execute(id));
  }

  remove(id: string): void {
    this._todos.set(this.deleteUseCase.execute(id));
  }

  clearCompleted(): void {
    this._todos.set(this.clearCompletedUseCase.execute());
  }

  setFilter(filter: TodoFilter): void {
    this._filter.set(filter);
  }

  clearError(): void {
    this._error.set(null);
  }
}