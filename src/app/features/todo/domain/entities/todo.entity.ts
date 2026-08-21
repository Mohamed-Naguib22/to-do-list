export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

export type TodoFilter = 'all' | 'active' | 'completed';

export function createTodo(title: string): Todo {
  const trimmed = title.trim();
  if (!trimmed) {
    throw new Error('Todo title cannot be empty');
  }
  return {
    id: crypto.randomUUID(),
    title: trimmed,
    completed: false,
    createdAt: Date.now(),
  };
}