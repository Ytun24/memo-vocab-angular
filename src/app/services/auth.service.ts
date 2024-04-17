import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  beUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  postSignUp(userData: any) {
    return this.http.post<any>(this.beUrl + '/signup', userData);
  }

  postLogin(userAuth:  any) {
    return this.http.post<any>(this.beUrl + '/login', userAuth);
  }
}
