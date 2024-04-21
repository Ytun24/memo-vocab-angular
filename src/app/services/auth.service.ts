import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  beUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  postSignUp(userData: any) {
    return this.http.post<any>(this.beUrl + '/signup', userData);
  }

  postLogin(userAuth: any) {
    return this.http.post<any>(this.beUrl + '/login', userAuth).pipe(
      tap((data) => {
        this.setAuthToken(data.token);
      })
    );
  }

  setAuthToken(token: string) {
    localStorage.setItem('token', token ?? '');
  }

  getAuthToken(): string {
    return localStorage.getItem('token') ?? '';
  }
}
