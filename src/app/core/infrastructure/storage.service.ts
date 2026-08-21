import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly isBrowser =
    typeof window !== 'undefined' && !!window.localStorage;

  get<T>(key: string, fallback: T): T {
    if (!this.isBrowser) return fallback;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch (err) {
      console.error(`[StorageService] Failed to read "${key}"`, err);
      return fallback;
    }
  }

  set<T>(key: string, value: T): void {
    if (!this.isBrowser) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`[StorageService] Failed to write "${key}"`, err);
    }
  }

  remove(key: string): void {
    if (!this.isBrowser) return;
    window.localStorage.removeItem(key);
  }
}