import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from '../infrastructure/storage/storage.service';
import { StorageKeys } from '../utils/storage-keys';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly _theme = signal<Theme>('light');
  readonly theme = this._theme.asReadonly();
  readonly isDark = () => this._theme() === 'dark';

  constructor(private storage: StorageService) {
    if (this.isBrowser) {
      this._theme.set(this.storage.get<Theme>(StorageKeys.APP_THEME, this.prefersDark() ? 'dark' : 'light'));
    }

    effect(() => {
      const theme = this._theme();
      if (!this.isBrowser) return;
      document.documentElement.classList.toggle('dark', theme === 'dark');
      this.storage.set(StorageKeys.APP_THEME, theme);
    });
  }

  private prefersDark(): boolean {
    return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  setTheme(theme: Theme): void {
    this._theme.set(theme);
  }

  toggle(): void {
    this._theme.set(this._theme() === 'light' ? 'dark' : 'light');
  }
}