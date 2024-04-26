import { TestBed } from '@angular/core/testing';

import { VocabService } from './vocab.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VocabService', () => {
  let service: VocabService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(VocabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
