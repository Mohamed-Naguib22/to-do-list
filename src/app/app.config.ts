import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { TodoRepository } from './features/todo/domain/repositories/todo.repository';
import { TodoLocalStorageRepository } from './features/todo/data/repositories/todo-local-storage.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    { provide: TodoRepository, useClass: TodoLocalStorageRepository },
  ]
};
