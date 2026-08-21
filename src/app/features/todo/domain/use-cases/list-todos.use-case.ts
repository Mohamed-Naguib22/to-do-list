import { Injectable, inject } from '@angular/core';
import { Todo } from '../entities/todo.entity';
import { TodoRepository } from '../repositories/todo.repository';

@Injectable({ providedIn: 'root' })
export class ListTodosUseCase {
  private repo = inject(TodoRepository);

  execute(): Todo[] {
    return this.repo.getAll();
  }
}