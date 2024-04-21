import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VocabService {
  beUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getVocabs() {
    return this.http.get<any>(this.beUrl + '/vocabs');
  }
}
