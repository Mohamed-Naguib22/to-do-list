import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/todo/presentation/pages/todo.page').then(m => m.TodoPageComponent),
  },
];