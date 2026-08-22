import { Injectable, inject } from '@angular/core';
import { StorageService } from '../../../../core/infrastructure/storage.service';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { Todo } from '../../domain/entities/todo.entity';

const STORAGE_KEY = 'todo-app:todos';

@Injectable({ providedIn: 'root' })
export class TodoLocalStorageRepository extends TodoRepository {
  private storage = inject(StorageService);

  getAll(): Todo[] {
    return this.storage.get<Todo[]>(STORAGE_KEY, []);
  }

  saveAll(todos: Todo[]): void {
    this.storage.set(STORAGE_KEY, todos);
  }
}