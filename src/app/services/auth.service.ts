import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environment/environment.development';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  postSignUp(userData: {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
  }) {
    return this.http.post<any>(environment.beUrl + '/signup', userData);
  }

  postLogin(userAuth: { email: string; password: string }) {
    return this.http.post<any>(environment.beUrl + '/login', userAuth).pipe(
      tap((data) => {
        this.setAuthToken(data.token);
      })
    );
  }

  setAuthToken(token: string) {
    localStorage.setItem('token', token ?? '');
  }

  getAuthToken(): string {
    if (this.isBrowser) {
      return localStorage.getItem('token') ?? '';
    }
    return '';
  }

  removeAuthToken(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
  }
}
