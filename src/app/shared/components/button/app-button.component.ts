import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

@Component({
  selector: 'app-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      (click)="clicked.emit($event)"
      [class]="classes()"
    >
      <ng-content />
    </button>
  `,
})

export class AppButtonComponent {
  variant = input<ButtonVariant>('primary');
  type = input<'button' | 'submit'>('button');
  disabled = input(false);
  clicked = output<MouseEvent>();

  private readonly base =
    'inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium ' +
    'transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-slate-900';

  private readonly variants: Record<ButtonVariant, string> = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary:
      'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-400 ' +
      'dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700',
    danger:
      'bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-400 ' +
      'dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900',
    ghost:
      'bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-400 ' +
      'dark:text-slate-400 dark:hover:bg-slate-800',
  };

  classes(): string {
    return `${this.base} ${this.variants[this.variant()]}`;
  }
}