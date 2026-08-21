import { Injectable, inject } from '@angular/core';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { Todo } from '../../domain/entities/todo.entity';

@Injectable({ providedIn: 'root' })
export class UpdateTodoUseCase {
  private repo = inject(TodoRepository);

  execute(id: string, title: string): Todo[] {
    const trimmed = title.trim();
    if (!trimmed) {
      throw new Error('Todo title cannot be empty');
    }
    const todos = this.repo.getAll();
    const next = todos.map((t) => (t.id === id ? { ...t, title: trimmed } : t));
    this.repo.saveAll(next);
    return next;
  }
}