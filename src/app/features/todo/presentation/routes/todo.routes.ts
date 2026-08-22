import { Routes } from '@angular/router';

export const TODO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../pages/todo.page').then(m => m.TodoPageComponent),
  },
];