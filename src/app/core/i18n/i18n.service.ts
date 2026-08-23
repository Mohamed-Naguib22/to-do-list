import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DICTIONARIES } from './i18n.dictionaries';
import { Lang } from './i18n.model';
import { StorageService } from '../infrastructure/storage/storage.service';
import { StorageKeys } from '../utils/storage-keys';

const RTL_LANGS: Lang[] = ['ar'];

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly _lang = signal<Lang>('en');
  readonly lang = this._lang.asReadonly();
  readonly dir = () => (RTL_LANGS.includes(this._lang()) ? 'rtl' : 'ltr');

  constructor(private storage: StorageService) {
    if (this.isBrowser) {
      this._lang.set(this.storage.get<Lang>(StorageKeys.APP_LANG, 'en'));
    }

    effect(() => {
      const lang = this._lang();
      if (!this.isBrowser) return;
      document.documentElement.lang = lang;
      document.documentElement.dir = this.dir();
      this.storage.set(StorageKeys.APP_LANG, lang);
    });
  }

  setLang(lang: Lang): void {
    this._lang.set(lang);
  }

  toggle(): void {
    this._lang.set(this._lang() === 'en' ? 'ar' : 'en');
  }

  t(key: string, params?: Record<string, string | number>): string {
    const dict = DICTIONARIES[this._lang()];
    let text = dict[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(`{${k}}`, String(v));
      }
    }
    return text;
  }
}