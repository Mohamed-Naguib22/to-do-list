import { Injectable, inject } from '@angular/core';
import { TodoRepository } from '../repositories/todo.repository';
import { Todo } from '../entities/todo.entity';

@Injectable({ providedIn: 'root' })
export class ClearCompletedUseCase {
  private repo = inject(TodoRepository);

  execute(): Todo[] {
    const todos = this.repo.getAll();
    const next = todos.filter((t) => !t.completed);
    this.repo.saveAll(next);
    return next;
  }
}