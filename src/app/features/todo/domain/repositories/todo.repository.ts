import { Todo } from '../entities/todo.entity';

export abstract class TodoRepository {
  abstract getAll(): Todo[];
  abstract saveAll(todos: Todo[]): void;
}