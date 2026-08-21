import { Injectable, inject } from '@angular/core';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { Todo } from '../../domain/entities/todo.entity';

@Injectable({ providedIn: 'root' })
export class DeleteTodoUseCase {
  private repo = inject(TodoRepository);

  execute(id: string): Todo[] {
    const todos = this.repo.getAll();
    const next = todos.filter((t) => t.id !== id);
    this.repo.saveAll(next);
    return next;
  }
}