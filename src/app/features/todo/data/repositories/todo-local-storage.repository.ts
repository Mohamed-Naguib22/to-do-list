import { Injectable, inject } from '@angular/core';
import { StorageService } from '../../../../core/infrastructure/storage.service';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { Todo } from '../../domain/entities/todo.entity';
import { StorageKeys } from '../../../../core/utils/storage-keys';

@Injectable({ providedIn: 'root' })
export class TodoLocalStorageRepository extends TodoRepository {
  private storage = inject(StorageService);

  getAll(): Todo[] {
    return this.storage.get<Todo[]>(StorageKeys.TODO, []);
  }

  saveAll(todos: Todo[]): void {
    this.storage.set(StorageKeys.TODO, todos);
  }
}