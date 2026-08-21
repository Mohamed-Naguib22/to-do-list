
import { Injectable, inject } from '@angular/core';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { Todo } from '../../domain/entities/todo.entity';

@Injectable({ providedIn: 'root' })
export class ToggleTodoUseCase {
  private repo = inject(TodoRepository);

  execute(id: string): Todo[] {
    const todos = this.repo.getAll();
    const next = todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    this.repo.saveAll(next);
    return next;
  }
}