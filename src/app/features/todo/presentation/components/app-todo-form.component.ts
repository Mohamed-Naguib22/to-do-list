import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TodoStore } from '../state/todo.store';
import { AppInputComponent } from '../../../../shared/components/input/app-input.component';
import { AppButtonComponent } from '../../../../shared/components/button/app-button.component';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule, AppInputComponent, AppButtonComponent, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form (ngSubmit)="submit()" class="flex items-start gap-2">
      <div class="flex-1">
        <app-input
          [(value)]="title"
          [placeholder]="'form.placeholder' | translate"
          [invalid]="!!store.error()"
          [errorText]="store.error() ? ('form.error.required' | translate) : null"
        />
      </div>
      <app-button type="submit" variant="primary">
        {{ 'form.add' | translate }}
      </app-button>
    </form>
  `,
})
export class TodoFormComponent {
  store = inject(TodoStore);
  title = signal('');
 
  submit(): void {
    this.store.add(this.title());
    if (!this.store.error()) {
      this.title.set('');
    }
  }
}