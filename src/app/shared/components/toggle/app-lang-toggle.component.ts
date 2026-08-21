import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-lang-toggle',
  standalone: true,
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      (click)="i18n.toggle()"
      class="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100
             dark:text-slate-400 dark:hover:bg-slate-800"
    >
      {{ 'lang.toggle' | translate }}
    </button>
  `,
})

export class LangToggleComponent {
  i18n = inject(I18nService);
}