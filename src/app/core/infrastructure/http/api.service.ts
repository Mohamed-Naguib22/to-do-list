// infrastructure/http/api.service.ts
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface RequestOptions {
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  get<T>(endpoint: string, options?: RequestOptions): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}/${endpoint}`, this.buildOptions(options))
      .pipe(catchError(this.handleError));
  }

  post<T, B = unknown>(endpoint: string, body: B, options?: RequestOptions): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}/${endpoint}`, body, this.buildOptions(options))
      .pipe(catchError(this.handleError));
  }

  put<T, B = unknown>(endpoint: string, body: B, options?: RequestOptions): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}/${endpoint}`, body, this.buildOptions(options))
      .pipe(catchError(this.handleError));
  }

  patch<T, B = unknown>(endpoint: string, body: B, options?: RequestOptions): Observable<T> {
    return this.http
      .patch<T>(`${this.baseUrl}/${endpoint}`, body, this.buildOptions(options))
      .pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string, options?: RequestOptions): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}/${endpoint}`, this.buildOptions(options))
      .pipe(catchError(this.handleError));
  }

  private buildOptions(options?: RequestOptions) {
    let params = new HttpParams();
    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        params = params.set(key, String(value));
      });
    }
    return { params, headers: options?.headers };
  }

  private handleError(error: HttpErrorResponse) {
    // centralize logging / mapping to a domain error type here
    console.error('API Error:', error);
    return throwError(() => error);
  }
}