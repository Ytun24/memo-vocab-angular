import { TestBed } from '@angular/core/testing';

import { VocabService } from './vocab.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environment/environment';

describe('VocabService', () => {
  let service: VocabService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(VocabService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('[getVocabs] should call get vocabs correctly', () => {
    service.getVocabs(1).subscribe();

    const req = httpTestingController.expectOne(environment.beUrl + '/vocabs?page=1');
    expect(req.request.method).toEqual('GET');
    req.flush({});
    httpTestingController.verify();
  });

  it('[postVocab] should call post vocab correctly', () => {
    const testData = {
      title: 'mock title',
      meaning: 'mock meaning',
      imageUrl: '',
    };

    service.postVocab(testData).subscribe();

    const req = httpTestingController.expectOne(environment.beUrl + '/vocab');
    expect(req.request.method).toEqual('POST');
    req.flush({});
    httpTestingController.verify();
  });
});
