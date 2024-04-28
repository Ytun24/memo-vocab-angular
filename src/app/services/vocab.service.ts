import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { Vocab } from '../interfaces/vocab';

@Injectable({
  providedIn: 'root',
})
export class VocabService {
  constructor(private http: HttpClient) {}

  getVocabs(page?: number) {
    const options = page ? { params: new HttpParams().set('page', page) } : {};
    return this.http.get<any>(environment.beUrl + '/vocabs', options);
  }

  postVocab(vocab: Vocab) {
    const formData = new FormData();
    formData.append('title', vocab?.title);
    formData.append('meaning', vocab?.meaning);
    formData.append('image', vocab?.imageUrl ?? '');
    console.log("formData: ", formData);
    return this.http.post<Vocab>(environment.beUrl + '/vocab', formData)
  }
}
