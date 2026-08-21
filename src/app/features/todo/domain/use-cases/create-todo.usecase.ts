import { Injectable, inject } from '@angular/core';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { Todo, createTodo } from '../../domain/entities/todo.entity';

@Injectable({ providedIn: 'root' })
export class CreateTodoUseCase {
  private repo = inject(TodoRepository);

  execute(title: string): Todo[] {
    const todos = this.repo.getAll();
    const next = [...todos, createTodo(title)];
    this.repo.saveAll(next);
    return next;
  }
}