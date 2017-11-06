import { TestBed, inject } from '@angular/core/testing';

import { ProblemSearchService } from './problem-search.service';

describe('ProblemSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProblemSearchService]
    });
  });

  it('should ...', inject([ProblemSearchService], (service: ProblemSearchService) => {
    expect(service).toBeTruthy();
  }));
});
