import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-1">
      <input
        [type]="type()"
        [placeholder]="placeholder()"
        [(ngModel)]="value"
        [class.border-red-400]="invalid()"
        class="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm
               text-slate-900 placeholder:text-slate-400 outline-none
               focus:border-primary-500 focus:ring-2 focus:ring-primary-100
               dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100
               dark:placeholder:text-slate-500 dark:focus:ring-primary-900"
      />
      @if (invalid() && errorText()) {
        <span class="text-xs text-red-500">{{ errorText() }}</span>
      }
    </div>
  `,
})

export class AppInputComponent {
  value = model<string>('');
  placeholder = input('');
  type = input<'text' | 'search'>('text');
  invalid = input(false);
  errorText = input<string | null>(null);
}