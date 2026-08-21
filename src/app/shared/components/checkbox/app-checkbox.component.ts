import { ChangeDetectionStrategy, Component, model } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      role="checkbox"
      [attr.aria-checked]="checked()"
      (click)="checked.set(!checked())"
      class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2
             transition-colors duration-150"
      [class.border-primary-500]="checked()"
      [class.bg-primary-500]="checked()"
      [class.border-slate-300]="!checked()"
      [class.dark:border-slate-600]="!checked()"
    >
      @if (checked()) {
        <svg viewBox="0 0 24 24" class="h-3 w-3 text-white" fill="none" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      }
    </button>
  `,
})

export class AppCheckboxComponent {
  checked = model<boolean>(false);
}